import React from 'react';
import { OutfitItem } from '../types';

interface OutfitCardProps {
    item: OutfitItem;
    index: number;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ item, index }) => {
    return (
        <div
            className="relative w-full rounded-2xl overflow-hidden bg-surface shadow-lg"
            style={{
                // Staggered animation delay for sequential reveal
                animationDelay: `${index * 150}ms`,
            }}
        >
            {/* Large product image - 4:5 aspect ratio like the reference */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover object-center animate-card-image"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Product info - clean minimal layout */}
            <div className="p-5 bg-white">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold tracking-[0.15em] text-secondary uppercase">
                            {item.category}
                        </span>
                        <h3 className="font-serif text-xl text-dark mt-1 leading-tight">
                            {item.name}
                        </h3>
                        <p className="text-xs text-stone-400 mt-1.5">
                            {item.color} · {item.material}
                        </p>
                    </div>
                    <span className="text-lg font-semibold text-primary shrink-0">
                        ${item.price.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};
