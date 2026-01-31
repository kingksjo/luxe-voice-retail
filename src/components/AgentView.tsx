import React, { useEffect, useState, useRef } from 'react';
import { OutfitItem, AgentState } from '../types';
import { GeminiLiveService } from '../services/geminiLive';
import { PRODUCT_CATALOG } from '../constants';
import { OutfitCard } from './OutfitCard';
import { AgentPill } from './AgentPill';

interface AgentViewProps {
    onClose: () => void;
}

export const AgentView: React.FC<AgentViewProps> = ({ onClose }) => {
    const [outfit, setOutfit] = useState<OutfitItem[]>([]);
    const [agentState, setAgentState] = useState<AgentState>('listening');
    const [volume, setVolume] = useState(0);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const serviceRef = useRef<GeminiLiveService | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const toggleMute = () => {
        if (serviceRef.current) {
            const newState = agentState === 'muted' ? 'listening' : 'muted';
            serviceRef.current.setMute(newState === 'muted');
        }
    };

    // Smooth scroll to bottom when new items added
    useEffect(() => {
        if (scrollRef.current && outfit.length > 0) {
            setTimeout(() => {
                scrollRef.current?.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [outfit.length]);

    // Auto-reconnect on error
    useEffect(() => {
        if (agentState === 'error') {
            const timer = setTimeout(() => {
                serviceRef.current?.connect().catch(console.error);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [agentState]);

    // Initialize Service
    useEffect(() => {
        const handleToolCall = async (name: string, args: any): Promise<string> => {
            const toolArgs = args as any;
            console.log('Executing Tool:', name, toolArgs);

            const showStatus = (msg: string) => {
                setStatusMessage(msg);
                setTimeout(() => setStatusMessage(null), 2500);
            };

            if (name === 'addOutfitItem') {
                const product = PRODUCT_CATALOG.find(p => p.id === toolArgs.productId);
                if (product) {
                    setOutfit(prev => {
                        if (prev.find(p => p.id === product.id)) return prev;
                        return [...prev, { ...product, addedAt: Date.now() }];
                    });
                    showStatus(`Adding ${product.name}`);
                    return `Added ${product.name} (${product.category}) to outfit`;
                }
                return `Product ${toolArgs.productId} not found in catalog`;
            } else if (name === 'removeOutfitItem') {
                setOutfit(prev => prev.filter(p => p.category !== toolArgs.category));
                showStatus(`Removed ${toolArgs.category}`);
                return `Removed ${toolArgs.category} from outfit`;
            } else if (name === 'replaceOutfitItem') {
                const newProduct = PRODUCT_CATALOG.find(p => p.id === toolArgs.newProductId);
                if (newProduct) {
                    setOutfit(prev => prev.map(p =>
                        p.id === toolArgs.oldProductId ? { ...newProduct, addedAt: Date.now() } : p
                    ));
                    showStatus(`Swapping to ${newProduct.name}`);
                    return `Replaced item with ${newProduct.name}`;
                }
                return `New product ${toolArgs.newProductId} not found`;
            } else if (name === 'clearOutfit') {
                setOutfit([]);
                showStatus('Starting fresh');
                return `Outfit cleared. Ready for new selections.`;
            }
            return `Unknown tool: ${name}`;
        };

        const service = new GeminiLiveService(handleToolCall, setAgentState, setVolume);
        serviceRef.current = service;

        service.connect().catch(err => {
            console.error("Failed to connect", err);
        });

        return () => {
            service.disconnect();
        };
    }, []);

    const totalPrice = outfit.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background animate-view-enter">

            {/* Header */}
            <div className="relative z-30 flex items-center justify-between px-5 pt-12 pb-4 bg-background/80 backdrop-blur-md border-b border-stone-200/50">
                <button
                    onClick={onClose}
                    className="size-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                >
                    <span className="material-symbols-outlined text-dark/70">close</span>
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 text-center">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-dark/70 uppercase">
                        Your Look
                    </span>
                </div>

                {outfit.length > 0 ? (
                    <div className="text-right">
                        <span className="text-sm font-semibold text-dark">${totalPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-stone-400 block">
                            {outfit.length} {outfit.length === 1 ? 'piece' : 'pieces'}
                        </span>
                    </div>
                ) : (
                    <div className="w-10" />
                )}
            </div>

            {/* Scrollable Card List */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-5 pt-6 pb-36 space-y-6 no-scrollbar scroll-smooth"
            >
                {/* Empty State */}
                {outfit.length === 0 && (
                    <div className="h-full min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="size-24 rounded-full bg-stone-100 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-5xl text-stone-300">styler</span>
                        </div>
                        <p className="font-serif text-2xl text-dark/80 mb-2">Your stylist awaits</p>
                        <p className="text-sm text-stone-400 max-w-[260px] leading-relaxed">
                            Describe the occasion or vibe you're going for
                        </p>
                    </div>
                )}

                {/* Cards */}
                {outfit.map((item, index) => (
                    <div
                        key={`${item.id}-${item.addedAt}`}
                        className="animate-card-enter"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <OutfitCard item={item} index={index} />
                    </div>
                ))}

                {/* Total summary at bottom */}
                {outfit.length > 1 && (
                    <div className="pt-4 pb-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <div className="flex items-center justify-between py-4 border-t border-dashed border-stone-200">
                            <span className="font-serif text-lg text-dark/60 italic">Complete Look</span>
                            <span className="text-xl font-bold text-dark">${totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Message */}
            {statusMessage && (
                <div className="fixed top-28 left-1/2 -translate-x-1/2 z-40 animate-status-enter">
                    <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-dark/90 backdrop-blur-sm shadow-xl">
                        <span className="material-symbols-outlined text-base text-primary">auto_awesome</span>
                        <span className="text-sm font-medium text-white">{statusMessage}</span>
                    </div>
                </div>
            )}

            {/* Agent Pill */}
            <AgentPill state={agentState} onClick={() => { }} volume={volume} onToggleMute={toggleMute} />
        </div>
    );
};
