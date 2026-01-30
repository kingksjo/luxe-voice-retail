import { GoogleGenAI, LiveServerMessage, Modality, FunctionDeclaration, Type } from '@google/genai';
import { decode, encode, decodeAudioData } from './audio';
import { PRODUCT_CATALOG, SYSTEM_INSTRUCTION } from '../constants';

// Define Function Declarations with strict types
const addOutfitItemDecl: FunctionDeclaration = {
    name: 'addOutfitItem',
    description: 'Add an item to the outfit.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            productId: {
                type: Type.STRING,
                description: `The ID of the product to add. Available IDs: ${PRODUCT_CATALOG.map(p => `${p.id} (${p.name})`).join(', ')}`
            },
            category: {
                type: Type.STRING,
                enum: ['top', 'bottom', 'shoes', 'accessory']
            }
        },
        required: ['productId', 'category']
    }
};

const removeOutfitItemDecl: FunctionDeclaration = {
    name: 'removeOutfitItem',
    description: 'Remove an item from the outfit.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            category: {
                type: Type.STRING,
                enum: ['top', 'bottom', 'shoes', 'accessory']
            }
        },
        required: ['category']
    }
};

const replaceOutfitItemDecl: FunctionDeclaration = {
    name: 'replaceOutfitItem',
    description: 'Replace an item in the outfit with a new one.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            oldProductId: { type: Type.STRING },
            newProductId: { type: Type.STRING, description: `The new product ID.` }
        },
        required: ['oldProductId', 'newProductId']
    }
};

const clearOutfitDecl: FunctionDeclaration = {
    name: 'clearOutfit',
    description: 'Clear all items from the outfit.',
    parameters: {
        type: Type.OBJECT,
        properties: {},
    }
};

export class GeminiLiveService {
    private ai: GoogleGenAI;
    private inputAudioContext: AudioContext | null = null;
    private outputAudioContext: AudioContext | null = null;
    private nextStartTime = 0;
    private sources = new Set<AudioBufferSourceNode>();
    private session: any = null;
    private onToolCall: (name: string, args: any) => Promise<any>;
    private onStatusChange: (status: 'idle' | 'listening' | 'speaking' | 'muted' | 'error') => void;
    private onVolumeChange: (volume: number) => void;
    private isMuted: boolean = false;
    private isConnected: boolean = false;
    private isConnecting: boolean = false;
    private inputAnalyser: AnalyserNode | null = null;
    private outputAnalyser: AnalyserNode | null = null;
    private animationFrameId: number | null = null;
    private audioStream: MediaStream | null = null;

    constructor(
        onToolCall: (name: string, args: any) => Promise<any>,
        onStatusChange: (status: 'idle' | 'listening' | 'speaking' | 'muted') => void,
        onVolumeChange: (volume: number) => void
    ) {
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        this.onToolCall = onToolCall;
        this.onStatusChange = onStatusChange;
        this.onVolumeChange = onVolumeChange;
    }

    async connect() {
        if (this.isConnected || this.isConnecting) return;
        this.isConnecting = true;

        try {
            // Clean up any existing audio resources before creating new ones
            // This prevents "cannot connect to AudioNode belonging to different context" errors
            if (this.inputAudioContext) {
                try { await this.inputAudioContext.close(); } catch (e) { }
            }
            if (this.outputAudioContext) {
                try { await this.outputAudioContext.close(); } catch (e) { }
            }
            this.inputAnalyser = null;
            this.outputAnalyser = null;

            this.inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            this.outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            this.nextStartTime = 0;
            this.sources.clear();

            // Audio Constraints for Echo Cancellation are CRITICAL for interruption to work
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    echoCancellation: true,
                    autoGainControl: true,
                    noiseSuppression: true,
                }
            });
            this.audioStream = stream;

            const sessionPromise = this.ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-12-2025',
                callbacks: {
                    onopen: () => {
                        this.isConnected = true;
                        this.isConnecting = false;
                        this.onStatusChange(this.isMuted ? 'muted' : 'listening');
                        if (!this.inputAudioContext) return;

                        const source = this.inputAudioContext.createMediaStreamSource(stream);

                        // Setup Input Analyzer
                        this.inputAnalyser = this.inputAudioContext.createAnalyser();
                        this.inputAnalyser.fftSize = 256;
                        source.connect(this.inputAnalyser);

                        const scriptProcessor = this.inputAudioContext.createScriptProcessor(4096, 1, 1);

                        // Start monitoring volume
                        this.monitorVolume();

                        scriptProcessor.onaudioprocess = (e) => {
                            if (!this.inputAudioContext) return; // Guard against closed context
                            if (this.isMuted) return; // Don't send audio when muted
                            if (!this.isConnected) return; // Don't send if session is closed
                            const inputData = e.inputBuffer.getChannelData(0);

                            // Convert to PCM 16-bit
                            const l = inputData.length;
                            const int16 = new Int16Array(l);
                            for (let i = 0; i < l; i++) {
                                int16[i] = inputData[i] * 32768;
                            }

                            const base64Data = encode(new Uint8Array(int16.buffer));

                            sessionPromise.then(session => {
                                session.sendRealtimeInput({
                                    media: {
                                        mimeType: 'audio/pcm;rate=16000',
                                        data: base64Data
                                    }
                                });
                            }).catch(e => {
                                console.error("Failed to send audio", e);
                            });
                        };

                        source.connect(scriptProcessor);
                        scriptProcessor.connect(this.inputAudioContext.destination);
                    },
                    onmessage: async (msg: LiveServerMessage) => {
                        console.log("[Agent] Message received:", msg.toolCall ? 'ToolCall' : msg.serverContent?.interrupted ? 'Interrupted' : msg.serverContent?.modelTurn ? 'Audio' : 'Other');
                        // 1. Handle Interruption
                        if (msg.serverContent?.interrupted) {
                            this.onStatusChange(this.isMuted ? 'muted' : 'listening');
                            for (const source of this.sources) {
                                try { source.stop(); } catch (e) { /* ignore */ }
                            }
                            this.sources.clear();
                            this.nextStartTime = 0;
                            return;
                        }

                        // 2. Handle Tool Calls
                        if (msg.toolCall) {
                            for (const fc of msg.toolCall.functionCalls) {
                                console.log("Tool call received:", fc.name, fc.args);
                                let result = "success";
                                try {
                                    await this.onToolCall(fc.name, fc.args);
                                } catch (error) {
                                    result = "error";
                                    console.error(error);
                                }
                                sessionPromise.then(session => {
                                    session.sendToolResponse({
                                        functionResponses: [{
                                            id: fc.id,
                                            name: fc.name,
                                            response: { result: { status: result } }
                                        }]
                                    });
                                }).catch(e => {
                                    console.error("Failed to send tool response:", e);
                                });
                            }
                        }

                        // 3. Handle Audio Response
                        const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                        if (base64Audio && this.outputAudioContext) {
                            this.onStatusChange('speaking');
                            this.nextStartTime = Math.max(this.outputAudioContext.currentTime, this.nextStartTime);
                            const audioBuffer = await decodeAudioData(
                                decode(base64Audio),
                                this.outputAudioContext,
                                24000,
                                1
                            );
                            const source = this.outputAudioContext.createBufferSource();
                            source.buffer = audioBuffer;
                            if (!this.outputAnalyser) {
                                this.outputAnalyser = this.outputAudioContext.createAnalyser();
                                this.outputAnalyser.fftSize = 256;
                                this.outputAnalyser.connect(this.outputAudioContext.destination);
                            }
                            source.connect(this.outputAnalyser);

                            source.addEventListener('ended', () => {
                                this.sources.delete(source);
                                if (this.sources.size === 0) {
                                    this.onStatusChange(this.isMuted ? 'muted' : 'listening');
                                }
                            });

                            source.start(this.nextStartTime);
                            this.sources.add(source);
                            this.nextStartTime += audioBuffer.duration;
                        }
                    },
                    onclose: (e) => {
                        console.log("Session closed", e);
                        this.isConnected = false;
                        this.isConnecting = false;
                        // If cleanly closed, idle. If error code, error.
                        if (e.code === 1000) {
                            this.onStatusChange('idle');
                        } else {
                            this.onStatusChange('error');
                        }
                    },
                    onerror: (e) => {
                        console.error("Session error", e);
                        this.isConnected = false;
                        this.isConnecting = false;
                        this.onStatusChange('error');
                    }
                },
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                    responseModalities: [Modality.AUDIO], // Must be an array with a single `Modality.AUDIO` element
                    tools: [{ functionDeclarations: [addOutfitItemDecl, removeOutfitItemDecl, replaceOutfitItemDecl, clearOutfitDecl] }],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } }
                    }
                }
            });

            this.session = sessionPromise;
        } catch (error) {
            console.error("Connection failed:", error);
            this.isConnecting = false;
            this.isConnected = false;
            this.onStatusChange('idle');
        }
    }

    private monitorVolume() {
        if (!this.isConnected && !this.isConnecting) return; // Stop loop if disconnected

        const checkVolume = () => {
            if (!this.isConnected) return; // Double check

            let volume = 0;
            const dataArray = new Uint8Array(128); // fftSize/2

            if (this.outputAnalyser) {
                this.outputAnalyser.getByteFrequencyData(dataArray);
                const sum = dataArray.reduce((bs, b) => bs + b, 0);
                const avg = sum / dataArray.length;
                if (avg > 5) { // Simple threshold to prefer output volume
                    volume = avg / 255;
                }
            }

            if (volume === 0 && this.inputAnalyser && !this.isMuted) {
                this.inputAnalyser.getByteFrequencyData(dataArray);
                const sum = dataArray.reduce((bs, b) => bs + b, 0);
                volume = (sum / dataArray.length) / 255;
            }

            this.onVolumeChange(Math.min(1, volume * 3)); // Boost a bit
            this.animationFrameId = requestAnimationFrame(checkVolume);
        };
        checkVolume();
    }

    async disconnect() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        // Stop the microphone stream
        if (this.audioStream) {
            this.audioStream.getTracks().forEach(track => track.stop());
            this.audioStream = null;
        }

        // Close the session to prevent 1006 errors on reconnect
        if (this.session) {
            try {
                const session = await this.session;
                session.close();
            } catch (e) {
                console.error("Error closing session:", e);
            }
        }
        this.session = null;
        this.isConnected = false;
        this.isConnecting = false;

        // Clean up audio contexts
        if (this.inputAudioContext) {
            try { await this.inputAudioContext.close(); } catch (e) { }
            this.inputAudioContext = null;
        }
        if (this.outputAudioContext) {
            try { await this.outputAudioContext.close(); } catch (e) { }
            this.outputAudioContext = null;
        }

        this.inputAnalyser = null;
        this.outputAnalyser = null;
    }

    setMute(muted: boolean) {
        this.isMuted = muted;
        // Only update status if not currently speaking - agent should keep talking
        if (this.sources.size === 0) {
            this.onStatusChange(muted ? 'muted' : 'listening');
        }
    }
}
