import { Product } from './types';

export const PRODUCT_CATALOG: Product[] = [
    // --- TOPS ---
    {
        id: 't1', category: 'top', name: 'Silk Bow Blouse', color: 'Ivory', material: '100% Silk', price: 890,
        style_tags: ['feminine', 'workplace', 'romantic', 'elegant'],
        image_url: '/assets/products/t1.png'
    },
    {
        id: 't2', category: 'top', name: 'Oversized Structured Blazer', color: 'Charcoal', material: 'Wool Blend', price: 1250,
        style_tags: ['masculine', 'workplace', 'alternative', 'going out', 'structured'],
        image_url: '/assets/products/t2.png'
    },
    {
        id: 't3', category: 'top', name: 'Luxe Cashmere Hoodie', color: 'Oatmeal', material: 'Pure Cashmere', price: 950,
        style_tags: ['neutral', 'gym/fitness', 'vacation', 'back to school', 'relaxed'],
        image_url: '/assets/products/t3.png'
    },
    {
        id: 't4', category: 'top', name: 'Sheer Mesh Turtleneck', color: 'Midnight Black', material: 'Technical Mesh', price: 320,
        style_tags: ['alternative', 'party', 'going out', 'edgy'],
        image_url: '/assets/products/t4.png'
    },
    {
        id: 't5', category: 'top', name: 'Crisp Linen Resort Shirt', color: 'White', material: 'Italian Linen', price: 450,
        style_tags: ['masculine', 'vacation', 'going out', 'breathable'],
        image_url: '/assets/products/t5.png'
    },
    {
        id: 't6', category: 'top', name: 'Sequined Slip Top', color: 'Champagne', material: 'Satin & Sequin', price: 580,
        style_tags: ['feminine', 'party', 'going out', 'glam'],
        image_url: '/assets/products/t6.png'
    },
    {
        id: 't7', category: 'top', name: 'Vintage Varsity Jacket', color: 'Navy/Cream', material: 'Wool & Leather', price: 1800,
        style_tags: ['masculine', 'back to school', 'alternative', 'casual'],
        image_url: '/assets/products/t7.png'
    },

    // --- BOTTOMS ---
    {
        id: 'b1', category: 'bottom', name: 'Tailored Wide-Leg Trousers', color: 'Black', material: 'Wool Gabardine', price: 790,
        style_tags: ['masculine', 'workplace', 'going out', 'formal'],
        image_url: '/assets/products/b1.png'
    },
    {
        id: 'b2', category: 'bottom', name: 'Pleated Midi Skirt', color: 'Dove Grey', material: 'Technical Pleat', price: 650,
        style_tags: ['feminine', 'workplace', 'back to school', 'minimal'],
        image_url: '/assets/products/b2.png'
    },
    {
        id: 'b3', category: 'bottom', name: 'Tech-Fleece Joggers', color: 'Slate', material: 'Performance Cotton', price: 380,
        style_tags: ['masculine', 'gym/fitness', 'vacation', 'comfort'],
        image_url: '/assets/products/b3.png'
    },
    {
        id: 'b4', category: 'bottom', name: 'Distressed Designer Denim', color: 'Washed Black', material: 'Japanese Denim', price: 520,
        style_tags: ['alternative', 'back to school', 'going out', 'grunge'],
        image_url: '/assets/products/b4.png'
    },
    {
        id: 'b5', category: 'bottom', name: 'High-Waist Bikini/Shorts', color: 'Emerald', material: 'Recycled Nylon', price: 280,
        style_tags: ['feminine', 'vacation', 'gym/fitness', 'swim'],
        image_url: '/assets/products/b5.png'
    },
    {
        id: 'b6', category: 'bottom', name: 'Silk Palazzo Pants', color: 'Coral', material: 'Raw Silk', price: 890,
        style_tags: ['feminine', 'vacation', 'party', 'bold'],
        image_url: '/assets/products/b6.png'
    },

    // --- SHOES ---
    {
        id: 's1', category: 'shoes', name: 'Classic Penny Loafers', color: 'Oxblood', material: 'Polished Leather', price: 650,
        style_tags: ['masculine', 'workplace', 'back to school', 'preppy'],
        image_url: '/assets/products/s1.png'
    },
    {
        id: 's2', category: 'shoes', name: 'Strappy Minimalist Heels', color: 'Silver', material: 'Metallic Leather', price: 720,
        style_tags: ['feminine', 'party', 'going out', 'elegant'],
        image_url: '/assets/products/s2.png'
    },
    {
        id: 's3', category: 'shoes', name: 'Chunky Combat Boots', color: 'Black', material: 'Vegan Leather', price: 890,
        style_tags: ['alternative', 'back to school', 'going out', 'utilitarian'],
        image_url: '/assets/products/s3.png'
    },
    {
        id: 's4', category: 'shoes', name: 'Performance Tech Runners', color: 'Neon/White', material: 'Mesh & Rubber', price: 340,
        style_tags: ['neutral', 'gym/fitness', 'weekend', 'sporty'],
        image_url: '/assets/products/s4.png'
    },
    {
        id: 's5', category: 'shoes', name: 'Leather Slides', color: 'Tan', material: 'Calfskin', price: 420,
        style_tags: ['neutral', 'vacation', 'relaxed', 'summer'],
        image_url: 'https://placehold.co/1000x1200/F5F5F4/A8A29E?text=Slides+Coming+Soon'
    },

    // --- ACCESSORIES ---
    {
        id: 'a1', category: 'accessory', name: 'Structured Leather Tote', color: 'Black', material: 'Saffiano Leather', price: 2100,
        style_tags: ['neutral', 'workplace', 'school', 'essential'],
        image_url: 'https://placehold.co/1000x1200/F5F5F4/A8A29E?text=Tote+Coming+Soon'
    },
    {
        id: 'a2', category: 'accessory', name: 'Micro Mini Bag', color: 'Fuchsia', material: 'Patent Leather', price: 950,
        style_tags: ['feminine', 'party', 'going out', 'statement'],
        image_url: 'https://placehold.co/1000x1200/F5F5F4/A8A29E?text=Mini+Bag+Coming+Soon'
    },
    {
        id: 'a3', category: 'accessory', name: 'Performance Duffle', color: 'Matte Black', material: 'Nylon', price: 450,
        style_tags: ['masculine', 'gym/fitness', 'vacation', 'utilitarian'],
        image_url: 'https://placehold.co/1000x1200/F5F5F4/A8A29E?text=Duffle+Coming+Soon'
    },
    {
        id: 'a4', category: 'accessory', name: 'Oversized Shield Sunglasses', color: 'Tortoise', material: 'Acetate', price: 380,
        style_tags: ['alternative', 'vacation', 'going out', 'bold'],
        image_url: 'https://placehold.co/1000x1200/F5F5F4/A8A29E?text=Sunglasses+Coming+Soon'
    }
];

// Generate catalog summary for system prompt (without image_url to save tokens)
const CATALOG_SUMMARY = PRODUCT_CATALOG.map(p => ({
    id: p.id,
    category: p.category,
    name: p.name,
    color: p.color,
    material: p.material,
    style_tags: p.style_tags,
    price: p.price
}));

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
- **You must ONLY recommend items from the provided catalog below.**
- Use 'style_tags' to match the user's request.
- If a specific item isn't available, suggest the best luxury alternative from the same category.
- **Do not hallucinate products.**

### AVAILABLE PRODUCT CATALOG
${JSON.stringify(CATALOG_SUMMARY, null, 2)}

### EXECUTION RULES (CRITICAL - MUST FOLLOW)
- **ALWAYS call tools** when modifying the outfit. NEVER just describe items verbally without calling the corresponding tool.
- Speak naturally about styling choices while SIMULTANEOUSLY calling functions.
- Available tools: addOutfitItem, removeOutfitItem, replaceOutfitItem, clearOutfit.
- When using addOutfitItem, use the exact 'id' field from the catalog above.
- **EVERY TIME** you suggest, add, remove, or change an outfit item, you MUST call the appropriate tool.
- If the user asks for a new outfit, call clearOutfit first, then addOutfitItem for each piece.
- Do not skip tool calls even if you've used them before in the conversation.
`;
