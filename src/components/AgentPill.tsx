import React from 'react';
import { AgentState } from '../types';

interface AgentPillProps {
    state: AgentState;
    onClick: () => void;
    volume?: number;
    onToggleMute?: () => void;
}

export const AgentPill: React.FC<AgentPillProps> = ({ state, onClick, volume = 0, onToggleMute }) => {
    const isMuted = state === 'muted';
    const isActive = state !== 'idle';
    const isError = state === 'error';

    // Main pill click opens agent view (idle) or does nothing (active)
    // Long-press or secondary gesture for mute would be ideal, but tap on mute area works
    const handlePillClick = () => {
        if (state === 'idle') {
            onClick();
        }
    };

    // Mute toggle via tapping the waveform area
    const handleWaveformClick = (e: React.MouseEvent) => {
        if (isActive && onToggleMute) {
            e.stopPropagation();
            onToggleMute();
        }
    };

    return (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6">
            <button
                onClick={handlePillClick}
                className={`
                    relative group flex items-center gap-3 h-14 pl-4 pr-6 rounded-full 
                    transition-all duration-500 w-auto max-w-full overflow-hidden
                    ${isActive
                        ? 'bg-dark text-white shadow-2xl'
                        : 'bg-white text-dark shadow-xl border border-stone-200 hover:shadow-2xl hover:scale-[1.02]'
                    }
                    ${isMuted ? 'opacity-90' : ''}
                `}
            >
                {/* Animated Gradient Background - Multi-layer premium effect */}

                {/* Layer 1: Base ambient glow (always on when active) */}
                <div
                    className={`
                        absolute inset-0 transition-all duration-700
                        ${isActive
                            ? isMuted
                                ? 'opacity-30 bg-gradient-to-r from-stone-500/20 via-stone-600/10 to-stone-500/20'
                                : 'opacity-100 bg-gradient-to-br from-primary/25 via-transparent to-primary/15'
                            : 'opacity-0'
                        }
                    `}
                />

                {/* Layer 2: Traveling shimmer (active + not muted) */}
                {isActive && !isMuted && (
                    <div
                        className="absolute inset-0 animate-shimmer"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(184, 102, 20, 0.3) 50%, transparent 100%)',
                            backgroundSize: '200% 100%',
                        }}
                    />
                )}

                {/* Layer 3: Edge glow on speaking */}
                {state === 'speaking' && (
                    <div
                        className="absolute inset-0 animate-pulse-glow"
                        style={{
                            boxShadow: 'inset 0 0 20px rgba(184, 102, 20, 0.4)',
                        }}
                    />
                )}

                {/* Waveform / Status Indicator - Tappable for mute */}
                <div
                    onClick={handleWaveformClick}
                    className={`
                        relative flex items-center justify-center size-9 rounded-full overflow-hidden 
                        transition-all duration-300 cursor-pointer
                        ${isActive && !isMuted && !isError ? 'hover:scale-110' : ''}
                        ${state === 'speaking' ? 'bg-primary/20' :
                            isMuted ? 'bg-stone-700' :
                                isError ? 'bg-red-900/50' :
                                    state === 'listening' ? 'bg-white/10' :
                                        'bg-stone-100'
                        }
                    `}
                >
                    {/* Idle State - Subtle pulsing orb */}
                    {state === 'idle' && (
                        <div className="relative size-4">
                            <div className="absolute inset-0 rounded-full bg-primary/60 animate-pulse" />
                            <div className="absolute inset-1 rounded-full bg-primary" />
                        </div>
                    )}

                    {/* Error State - Subtle warning */}
                    {isError && (
                        <div className="size-3 rounded-full bg-red-400 animate-pulse" />
                    )}

                    {/* Muted State - Paused waveform (static bars) */}
                    {isMuted && (
                        <div className="flex items-center gap-[3px] h-4 opacity-50">
                            <div className="w-[3px] bg-stone-400 rounded-full h-[30%]" />
                            <div className="w-[3px] bg-stone-400 rounded-full h-[50%]" />
                            <div className="w-[3px] bg-stone-400 rounded-full h-[30%]" />
                        </div>
                    )}

                    {/* Active States - Dynamic Waveform */}
                    {(state === 'listening' || state === 'speaking' || state === 'processing') && (
                        <div className="flex items-center gap-[3px] h-5">
                            {[0.6, 1, 0.8, 1, 0.6].map((multiplier, i) => (
                                <div
                                    key={i}
                                    className={`
                                        w-[3px] rounded-full transition-all
                                        ${state === 'speaking'
                                            ? 'bg-primary duration-75'
                                            : 'bg-white/70 duration-100'
                                        }
                                    `}
                                    style={{
                                        height: `${Math.max(15, Math.min(100, volume * 100 * multiplier + (state === 'processing' ? 30 : 20)))}%`,
                                        animationDelay: `${i * 50}ms`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start min-w-0 relative z-10">
                    <span className={`text-sm font-semibold truncate leading-tight ${isActive ? 'text-white' : 'text-dark'}`}>
                        {state === 'idle' && "What's the occasion?"}
                        {state === 'listening' && "Listening..."}
                        {state === 'speaking' && "Styling for you..."}
                        {state === 'processing' && "Thinking..."}
                        {isMuted && "Tap to resume"}
                        {isError && "Reconnecting..."}
                    </span>
                    <span className={`text-[10px] font-medium uppercase tracking-wider leading-tight ${isActive ? 'text-stone-400' : 'text-secondary'}`}>
                        {isMuted ? 'Paused' : 'AI Stylist'}
                    </span>
                </div>

                {/* Close hint on hover (idle only) */}
                {state === 'idle' && (
                    <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="size-6 rounded-full bg-stone-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm text-stone-400">arrow_forward</span>
                        </div>
                    </div>
                )}
            </button>
        </div>
    );
};
