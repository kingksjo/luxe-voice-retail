import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { AgentPill } from './components/AgentPill';
import { AgentView } from './components/AgentView';
import { PRODUCT_CATALOG } from './constants';

const App: React.FC = () => {
    const [isAgentOpen, setIsAgentOpen] = useState(false);

    // Filter "New Arrivals" (Just taking the first 4 for the demo grid)
    const featuredProducts = PRODUCT_CATALOG.slice(0, 4);

    return (
        <div className="min-h-screen bg-background text-dark font-sans relative">
            <Header />

            <main className="pb-32">
                {/* Hero Section */}
                <div className="px-4 py-6">
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden group shadow-sm">
                        <img
                            src="/assets/products/meta-rayban-tt.jpg"
                            alt="Meta Ray-Ban Smart Glasses"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start text-white">
                            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-2">Autumn / Winter '24</p>
                            <h2 className="font-serif text-4xl mb-4">Elegance Redefined</h2>
                            <button className="text-sm font-bold tracking-widest border-b border-white pb-1 hover:text-primary hover:border-primary transition-colors">
                                EXPLORE COLLECTION
                            </button>
                        </div>
                    </div>
                </div>

                {/* New Arrivals */}
                <div className="px-6 pt-4 pb-2 flex justify-between items-end">
                    <h2 className="font-serif text-2xl font-medium">New Arrivals</h2>
                    <button className="text-xs font-bold tracking-widest text-primary hover:text-dark transition-colors">VIEW ALL</button>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>

            {/* Agent Interaction */}
            {!isAgentOpen && (
                <AgentPill state="idle" onClick={() => setIsAgentOpen(true)} />
            )}

            {/* Agent Overlay */}
            {isAgentOpen && (
                <AgentView onClose={() => setIsAgentOpen(false)} />
            )}
        </div>
    );
};

export default App;
