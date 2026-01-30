import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="group cursor-pointer flex flex-col gap-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-surface">
                <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-dark opacity-0 transition-opacity hover:bg-white group-hover:opacity-100">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                </button>
            </div>
            <div>
                <h3 className="text-dark text-sm font-medium leading-tight">{product.name}</h3>
                <p className="text-primary text-sm font-semibold mt-1">${product.price.toLocaleString()}</p>
            </div>
        </div>
    );
};
