import React from 'react';
import { OutfitItem } from '../types';

interface OutfitCardProps {
    item: OutfitItem;
    onRemove: () => void;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({ item, onRemove }) => {
    return (
        <div className="animate-slide-up flex flex-col bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-500 hover:shadow-md">
            <div className="flex h-32 md:h-40">
                <div className="w-28 md:w-36 shrink-0 relative bg-surface">
                    <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                             <span className="text-[10px] font-bold tracking-widest text-secondary uppercase">{item.category}</span>
                             <span className="text-primary font-medium text-sm">${item.price}</span>
                        </div>
                        <h3 className="font-serif text-lg text-dark mt-1 leading-tight">{item.name}</h3>
                        <p className="text-xs text-stone-500 mt-1">{item.color} · {item.material}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
