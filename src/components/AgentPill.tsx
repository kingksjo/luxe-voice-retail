import React from 'react';
import { AgentState } from '../types';

interface AgentPillProps {
    state: AgentState;
    onClick: () => void;
    volume?: number;
    onToggleMute?: () => void;
}

export const AgentPill: React.FC<AgentPillProps> = ({ state, onClick, volume = 0, onToggleMute }) => {
    return (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6 items-end gap-2">

            {/* Mute Button (Slide-out) */}
            {state !== 'idle' && onToggleMute && (
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
                    className={`
                        size-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                        ${state === 'muted' ? 'bg-red-500 text-white' : 'bg-white text-dark hover:bg-stone-100'}
                    `}
                >
                    <span className="material-symbols-outlined">{state === 'muted' ? 'mic_off' : 'mic'}</span>
                </button>
            )}

            <button
                onClick={onClick}
                className={`
                    relative group flex items-center gap-3 h-14 pl-5 pr-6 rounded-full 
                    transition-all duration-500 w-auto max-w-full overflow-hidden
                    ${state !== 'idle' ? 'bg-dark text-white shadow-2xl scale-105' : 'bg-white text-dark shadow-xl border border-stone-200'}
                `}
            >
                {/* Background Animation for Active State */}
                {state !== 'idle' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-pulse-slow"></div>
                )}

                {/* Icon / Waveform */}
                <div className={`flex items-center justify-center size-8 rounded-full overflow-hidden 
                    ${state === 'speaking' ? 'bg-primary/10 text-primary' :
                        state === 'muted' ? 'bg-red-50 text-red-500' :
                            'bg-stone-100 text-secondary'}
                `}>
                    {state === 'idle' || state === 'muted' || state === 'error' ? (
                        <span className="material-symbols-outlined">
                            {state === 'muted' ? 'mic_off' : state === 'error' ? 'wifi_off' : 'graphic_eq'}
                        </span>
                    ) : (
                        <div className="flex items-center gap-[3px] h-4 items-center">
                            {/* Dynamic Bars based on volume */}
                            <div className="w-[3px] bg-current rounded-full transition-all duration-75" style={{ height: `${Math.max(20, volume * 100)}%` }}></div>
                            <div className="w-[3px] bg-current rounded-full transition-all duration-75" style={{ height: `${Math.max(30, volume * 140)}%` }}></div>
                            <div className="w-[3px] bg-current rounded-full transition-all duration-75" style={{ height: `${Math.max(20, volume * 100)}%` }}></div>
                        </div>
                    )}
                </div>

                {/* Text */}
                <div className="flex flex-col items-start min-w-0 relative z-10">
                    <span className={`text-sm font-semibold truncate leading-tight ${state !== 'idle' ? 'text-white' : 'text-dark'}`}>
                        {state === 'idle' && "Ask me about these styles..."}
                        {state === 'listening' && "Listening..."}
                        {state === 'speaking' && "Curating..."}
                        {state === 'processing' && "Thinking..."}
                        {state === 'muted' && "Muted"}
                        {state === 'error' && "Connection Lost"}
                    </span>
                    <span className={`text-[10px] font-medium uppercase tracking-wider leading-tight ${state !== 'idle' ? 'text-stone-400' : 'text-secondary'}`}>
                        AI Stylist
                    </span>
                </div>
            </button>
        </div>
    );
};
