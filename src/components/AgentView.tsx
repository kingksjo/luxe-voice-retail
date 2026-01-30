import React, { useEffect, useState, useRef } from 'react';
import { OutfitItem, Product, AgentState, ToolCallArgs } from '../types';
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
    const serviceRef = useRef<GeminiLiveService | null>(null);
    const scrollEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when outfit changes
    useEffect(() => {
        scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [outfit]);

    // Initialize Service
    useEffect(() => {
        const handleToolCall = async (name: string, args: any) => {
            const toolArgs = args as any;
            console.log('Executing Tool:', name, toolArgs);

            if (name === 'addOutfitItem') {
                const product = PRODUCT_CATALOG.find(p => p.id === toolArgs.productId);
                if (product) {
                    setOutfit(prev => {
                        if (prev.find(p => p.id === product.id)) return prev;
                        return [...prev, { ...product, addedAt: Date.now() }];
                    });
                }
            } else if (name === 'removeOutfitItem') {
                setOutfit(prev => prev.filter(p => p.category !== toolArgs.category));
            } else if (name === 'replaceOutfitItem') {
                const newProduct = PRODUCT_CATALOG.find(p => p.id === toolArgs.newProductId);
                if (newProduct) {
                    setOutfit(prev => prev.map(p => 
                        p.id === toolArgs.oldProductId ? { ...newProduct, addedAt: Date.now() } : p
                    ));
                }
            } else if (name === 'clearOutfit') {
                setOutfit([]);
            }
        };

        const service = new GeminiLiveService(handleToolCall, setAgentState);
        serviceRef.current = service;
        
        service.connect().catch(err => {
            console.error("Failed to connect", err);
            // Optionally handle error UI
        });

        return () => {
            service.disconnect();
        };
    }, []);

    const totalPrice = outfit.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl transition-all duration-500 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-12 border-b border-stone-200/50">
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-dark/80">Current Selection</h2>
                <button onClick={onClose} className="size-10 flex items-center justify-center rounded-full hover:bg-stone-200/50 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 pb-32 space-y-4 no-scrollbar">
                {outfit.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                        <span className="material-symbols-outlined text-4xl mb-2">checkroom</span>
                        <p className="font-serif text-lg">Your dressing room is empty.</p>
                        <p className="text-xs uppercase tracking-wide mt-2">Speak to start styling</p>
                    </div>
                )}
                
                {outfit.map((item) => (
                    <OutfitCard 
                        key={`${item.id}-${item.addedAt}`} 
                        item={item} 
                        onRemove={() => setOutfit(prev => prev.filter(p => p.id !== item.id))} 
                    />
                ))}
                
                {outfit.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-dashed border-stone-300">
                        <div className="flex justify-between items-end">
                            <span className="font-serif text-xl italic text-dark">Total</span>
                            <span className="font-sans text-2xl font-bold text-dark">${totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                )}
                <div ref={scrollEndRef} />
            </div>

            {/* Agent Pill (Sticky within Overlay) */}
            <AgentPill state={agentState} onClick={() => {}} />
        </div>
    );
};
