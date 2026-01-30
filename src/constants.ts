import { Product } from './types';

export const SYSTEM_INSTRUCTION = `You are an autonomous AI fashion stylist for a luxury brand called LUXE. 
Your goal is to curate a coherent, stylish outfit for the user based on their voice intent.

### CORE CONTEXT
The user will ask for outfits based on:
1. **Occasion**: "Workplace", "Vacation/Holiday", "Back to School", "Party", "Gym/Fitness", "Going Out" (restaurants, picnics).
2. **Vibe/Style**: "Masculine", "Feminine", or "Alternative".

### REASONING RULES
- **Analyze Implicit Signals**: 
    - "I have a board meeting" -> Workplace + Professional. 
    - "I'm hitting the club" -> Party + Edgy/Alt or Glam.
    - "Heading to class" -> Back to School + Casual/Smart.
- **Respect Gender/Style**: 
    - If the user uses masculine terms or asks for "menswear", prioritize 'masculine' tagged items. 
    - If feminine, 'feminine'. 
    - "Alt" or "Edge" should pull from 'alternative' tags.
- **Luxury Constraint**: Even for "Gym" or "School", the items must be styled as high-fashion luxury (e.g., Cashmere hoodie, not basic gym gear).
- **Fallback**: If unsure of style, default to "Neutral/Minimal" which works for everyone.

### CATALOG USAGE
- **You must ONLY recommend items from the provided catalog.**
- Use 'style_tags' to match the user's request.
- If a specific item isn't available, suggest the best luxury alternative from the same category.
- **Do not hallucinate products.**

### EXECUTION
- Speak naturally about styling choices (e.g., "This silk blouse creates a soft, professional silhouette...").
- **SIMULTANEOUSLY** call functions to update the UI. Do not wait to finish speaking or ask for permission.
- **Tools**: addOutfitItem, removeOutfitItem, replaceOutfitItem, clearOutfit.
`;

export const PRODUCT_CATALOG: Product[] = [
    // --- TOPS ---
    {
        id: 't1', category: 'top', name: 'Silk Bow Blouse', color: 'Ivory', material: '100% Silk', price: 890,
        style_tags: ['feminine', 'workplace', 'romantic', 'elegant'],
        image_url: 'https://images.unsplash.com/photo-1604176354204-9268737828c4?q=80&w=2080&auto=format&fit=crop'
    },
    {
        id: 't2', category: 'top', name: 'Oversized Structured Blazer', color: 'Charcoal', material: 'Wool Blend', price: 1250,
        style_tags: ['masculine', 'workplace', 'alternative', 'going out', 'structured'],
        image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop'
    },
    {
        id: 't3', category: 'top', name: 'Luxe Cashmere Hoodie', color: 'Oatmeal', material: 'Pure Cashmere', price: 950,
        style_tags: ['neutral', 'gym/fitness', 'vacation', 'back to school', 'relaxed'],
        image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop'
    },
    {
        id: 't4', category: 'top', name: 'Sheer Mesh Turtleneck', color: 'Midnight Black', material: 'Technical Mesh', price: 320,
        style_tags: ['alternative', 'party', 'going out', 'edgy'],
        image_url: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2072&auto=format&fit=crop'
    },
    {
        id: 't5', category: 'top', name: 'Crisp Linen Resort Shirt', color: 'White', material: 'Italian Linen', price: 450,
        style_tags: ['masculine', 'vacation', 'going out', 'breathable'],
        image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop'
    },
    {
        id: 't6', category: 'top', name: 'Sequined Slip Top', color: 'Champagne', material: 'Satin & Sequin', price: 580,
        style_tags: ['feminine', 'party', 'going out', 'glam'],
        image_url: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 't7', category: 'top', name: 'Vintage Varsity Jacket', color: 'Navy/Cream', material: 'Wool & Leather', price: 1800,
        style_tags: ['masculine', 'back to school', 'alternative', 'casual'],
        image_url: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?q=80&w=2070&auto=format&fit=crop'
    },

    // --- BOTTOMS ---
    {
        id: 'b1', category: 'bottom', name: 'Tailored Wide-Leg Trousers', color: 'Black', material: 'Wool Gabardine', price: 790,
        style_tags: ['masculine', 'workplace', 'going out', 'formal'],
        image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 'b2', category: 'bottom', name: 'Pleated Midi Skirt', color: 'Dove Grey', material: 'Technical Pleat', price: 650,
        style_tags: ['feminine', 'workplace', 'back to school', 'minimal'],
        image_url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1964&auto=format&fit=crop'
    },
    {
        id: 'b3', category: 'bottom', name: 'Tech-Fleece Joggers', color: 'Slate', material: 'Performance Cotton', price: 380,
        style_tags: ['masculine', 'gym/fitness', 'vacation', 'comfort'],
        image_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1888&auto=format&fit=crop'
    },
    {
        id: 'b4', category: 'bottom', name: 'Distressed Designer Denim', color: 'Washed Black', material: 'Japanese Denim', price: 520,
        style_tags: ['alternative', 'back to school', 'going out', 'grunge'],
        image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 'b5', category: 'bottom', name: 'High-Waist Bikini/Shorts', color: 'Emerald', material: 'Recycled Nylon', price: 280,
        style_tags: ['feminine', 'vacation', 'gym/fitness', 'swim'],
        image_url: 'https://images.unsplash.com/photo-1605763240004-741b7f72b529?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 'b6', category: 'bottom', name: 'Silk Palazzo Pants', color: 'Coral', material: 'Raw Silk', price: 890,
        style_tags: ['feminine', 'vacation', 'party', 'bold'],
        image_url: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1956&auto=format&fit=crop'
    },

    // --- SHOES ---
    {
        id: 's1', category: 'shoes', name: 'Classic Penny Loafers', color: 'Oxblood', material: 'Polished Leather', price: 650,
        style_tags: ['masculine', 'workplace', 'back to school', 'preppy'],
        image_url: 'https://images.unsplash.com/photo-1616406432452-07bc59365e44?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 's2', category: 'shoes', name: 'Strappy Minimalist Heels', color: 'Silver', material: 'Metallic Leather', price: 720,
        style_tags: ['feminine', 'party', 'going out', 'elegant'],
        image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop'
    },
    {
        id: 's3', category: 'shoes', name: 'Chunky Combat Boots', color: 'Black', material: 'Vegan Leather', price: 890,
        style_tags: ['alternative', 'back to school', 'going out', 'utilitarian'],
        image_url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 's4', category: 'shoes', name: 'Performance Tech Runners', color: 'Neon/White', material: 'Mesh & Rubber', price: 340,
        style_tags: ['neutral', 'gym/fitness', 'weekend', 'sporty'],
        image_url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop'
    },
    {
        id: 's5', category: 'shoes', name: 'Leather Slides', color: 'Tan', material: 'Calfskin', price: 420,
        style_tags: ['neutral', 'vacation', 'relaxed', 'summer'],
        image_url: 'https://images.unsplash.com/photo-1603487742131-4160d6986ba2?q=80&w=2070&auto=format&fit=crop'
    },

    // --- ACCESSORIES ---
    {
        id: 'a1', category: 'accessory', name: 'Structured Leather Tote', color: 'Black', material: 'Saffiano Leather', price: 2100,
        style_tags: ['neutral', 'workplace', 'school', 'essential'],
        image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop'
    },
    {
        id: 'a2', category: 'accessory', name: 'Micro Mini Bag', color: 'Fuchsia', material: 'Patent Leather', price: 950,
        style_tags: ['feminine', 'party', 'going out', 'statement'],
        image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop'
    },
    {
        id: 'a3', category: 'accessory', name: 'Performance Duffle', color: 'Matte Black', material: 'Nylon', price: 450,
        style_tags: ['masculine', 'gym/fitness', 'vacation', 'utilitarian'],
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 'a4', category: 'accessory', name: 'Oversized Shield Sunglasses', color: 'Tortoise', material: 'Acetate', price: 380,
        style_tags: ['alternative', 'vacation', 'going out', 'bold'],
        image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop'
    }
];
