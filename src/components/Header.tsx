import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-40 flex items-center bg-background/90 backdrop-blur-md px-6 py-4 justify-between border-b border-stone-100">
            <div className="flex size-10 items-center justify-start">
                <span className="material-symbols-outlined text-dark text-3xl">menu</span>
            </div>
            <h1 className="font-serif text-dark text-2xl font-semibold tracking-wider flex-1 text-center">LUXE</h1>
            <div className="flex size-10 items-center justify-end">
                <span className="material-symbols-outlined text-dark text-2xl">shopping_bag</span>
            </div>
        </header>
    );
};
