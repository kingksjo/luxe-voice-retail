export type Category = 'top' | 'bottom' | 'shoes' | 'accessory';

export interface Product {
    id: string;
    category: Category;
    name: string;
    color: string;
    material: string;
    style_tags: string[];
    price: number;
    image_url: string;
}

export interface OutfitItem extends Product {
    addedAt: number; // Timestamp for animation sorting
}

export type AgentState = 'idle' | 'listening' | 'speaking' | 'processing' | 'muted' | 'error';

export interface ToolCallArgs {
    addOutfitItem?: { productId: string };
    removeOutfitItem?: { category: Category };
    replaceOutfitItem?: { oldProductId: string; newProductId: string };
    clearOutfit?: {};
}
