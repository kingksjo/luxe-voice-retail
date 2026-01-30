import React from 'react';
import { AgentState } from '../types';

interface AgentPillProps {
    state: AgentState;
    onClick: () => void;
}

export const AgentPill: React.FC<AgentPillProps> = ({ state, onClick }) => {
    return (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-6">
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
                <div className={`flex items-center justify-center size-8 rounded-full ${state !== 'idle' ? 'bg-white/10 text-primary' : 'bg-primary/10 text-primary'}`}>
                    <span className={`material-symbols-outlined ${state === 'speaking' || state === 'listening' ? 'animate-pulse' : ''}`}>
                        graphic_eq
                    </span>
                </div>

                {/* Text */}
                <div className="flex flex-col items-start min-w-0 relative z-10">
                    <span className={`text-sm font-semibold truncate leading-tight ${state !== 'idle' ? 'text-white' : 'text-dark'}`}>
                        {state === 'idle' && "Ask me about these styles..."}
                        {state === 'listening' && "Listening..."}
                        {state === 'speaking' && "Curating..."}
                        {state === 'processing' && "Thinking..."}
                    </span>
                    <span className={`text-[10px] font-medium uppercase tracking-wider leading-tight ${state !== 'idle' ? 'text-stone-400' : 'text-secondary'}`}>
                        AI Stylist
                    </span>
                </div>
            </button>
        </div>
    );
};
