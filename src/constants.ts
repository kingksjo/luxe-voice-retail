import { Product } from './types';

export const SYSTEM_INSTRUCTION = `You are an autonomous AI fashion stylist for a luxury brand called LUXE. 
Your goal is to curate a coherent, stylish outfit for the user based on their voice intent.
You have direct control over the UI via function calling. 
Do not explicitly mention that you are "using a tool" or "updating the screen". Just speak naturally about the fashion choices while simultaneously executing the updates.
When the user speaks, interpret their vibe (e.g., "minimal", "weekend in Paris", "business casual") and immediately start building or modifying the outfit.
Always prioritize quality, material, and color coordination.
If the user asks for something vague, make a decision and justify it with fashion expertise.
If the user's request is impossible (e.g., "show me a spacesuit"), politely steer them back to luxury fashion.
Keep your spoken responses concise, elegant, and warm. Avoid robotic phrasing.
The catalog is small. If a specific item isn't available, suggest the closest alternative from the available categories.
You MUST use the provided tools to update the visual outfit list. 
- addOutfitItem: Adds an item to the list.
- removeOutfitItem: Removes an item by category.
- replaceOutfitItem: Swaps an item.
- clearOutfit: Resets the list.
`;

export const PRODUCT_CATALOG: Product[] = [
    // Tops
    {
        id: 't1',
        category: 'top',
        name: 'Silk Bow Blouse',
        color: 'Ivory',
        material: '100% Silk',
        price: 890,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXpT19b5F9_8eeBB5kG1PZN_1hkwWfrQI_Qq0syQE5GVBy_DMm2QLHAsDtP_ymHon_9csy4sAICD84GHRsN1KgLSNabhAFCblvUnsGnQC6WbkX4xTxk1nPPuTxWf3eRRsfjKuqlIRo2q43PGfHlq9KnywhynrvnydvVxKiKne8Kvc3bqYk2Cp3e50cvF8PpYkmc_AuFL4SZifSzTUIr6VDHdKJSwJjlvrYApWtHHN18BcC6p7F4-ElPvH1KV42NHSxeYfhZWuRgeE'
    },
    {
        id: 't2',
        category: 'top',
        name: 'Cashmere Wrap Coat',
        color: 'Camel',
        material: 'Cashmere',
        price: 2450,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDK3lTYMzcn8RAr9NWFW-xY6ecdsnAbjMC_eWIlNNHxvF0YYiIe8ST2WdQi_kB_VN9X_pnM7v-Tmh7um3g2cfkoO4-113ftfG2WENdaS1PKTdhWm3xpRptW_3b_-IHElSBXMdLTBuBm7byOU_X7iB1UpknTbbWk21hsexgdtSbCRvSq01ScsHc9BsKs5Qypuc0GSm_hqISvYXkvW1wal0vinq1J_6M4GwtwgLfr8tH7wmTEuGrNx5HtebDZze4JTSlp4hOJXNwvWU'
    },
    {
        id: 't3',
        category: 'top',
        name: 'Wool Blend Blazer',
        color: 'Taupe check',
        material: 'Wool Blend',
        price: 1250,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvd-_H8CSsHa-XH8CKrng1ZwglXBnsWr0EOdZgQcc24piXeb8GLvqNg6eeaWSc6B5JAGWccMPlTt1d-rTUPtm5vkgxjg7tk5syB46o38vjZFrYP6TukOTHL8mdyQq0-lvE6OLUuL8yLO-CIFkYZdVS69MivOyn5LnoveA_n2sH0M5hDTu1M38_EAZkNJ3FkhDtAVM_DKeNYs9rJQzHDXxaOsmxniehCJs0NRRiY24v3YFneQc5K4nPKjZ_Pz7xnrJ-pg4YLLpUP0'
    },
    {
        id: 't4',
        category: 'top',
        name: 'Crisp Poplin Shirt',
        color: 'White',
        material: 'Cotton Poplin',
        price: 450,
        image_url: 'https://images.unsplash.com/photo-1598532163257-52b6b5274d71?q=80&w=1952&auto=format&fit=crop'
    },
    {
        id: 't5',
        category: 'top',
        name: 'Oversized Knit Sweater',
        color: 'Charcoal',
        material: 'Merino Wool',
        price: 680,
        image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop'
    },

    // Bottoms
    {
        id: 'b1',
        category: 'bottom',
        name: 'High-Waist Trousers',
        color: 'Black',
        material: 'Wool',
        price: 320,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOT_DHdVUED7dEt9CGuI4Q1AJdtiA7f3xX0MeBpjob0D1htfgfbuO3L-jbWMmt-clF2VCG7YYW1DTijKsJFzjA7e6gyyAfkvCLpzipD0Ff6BUo_jkutC-QqbC80PH7eKvxR_7NHIZ2knaAce1kUKpsdfUwA6u0V67rkHMi6rUFQb0d_XG-4PxCE-o8Uo6ZuzT-auOsnMSifn9UA5f654OBvHax2dPYtwXyvaWfPlEJml88PznAsfaw76y0NvgOJLyIiJKoWuZLEc'
    },
    {
        id: 'b2',
        category: 'bottom',
        name: 'Silk Pleated Trousers',
        color: 'Olive',
        material: 'Silk Blend',
        price: 980,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN4xH2npj8kcjqfJnXB4IG77YmcOtFdNQBiT3BkSMxFJHWoWaxelCkxfGDW-ztHIwQxKbUzcx86F5cDeAzxi1JUaEquDIFEgS9kI7Q-js0LByRU-ZQhMXQYq2hVGuCvgOtc27TRtcni11UZlDMLvxwLdkAGEKGdW7t2DC7pcDLxoxyOzZjqG451x10iCFYeFxAOVU-ub9bcCyBzi34o9j0nahII4jKhlSKbWL35mRMj9tc52bn32jnJEiple4sTQgoiccsQnYGxgg'
    },
    {
        id: 'b3',
        category: 'bottom',
        name: 'Straight Leg Denim',
        color: 'Mid Wash',
        material: 'Organic Denim',
        price: 280,
        image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop'
    },
     {
        id: 'b4',
        category: 'bottom',
        name: 'Midi Satin Skirt',
        color: 'Champagne',
        material: 'Satin',
        price: 350,
        image_url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1964&auto=format&fit=crop'
    },

    // Shoes
    {
        id: 's1',
        category: 'shoes',
        name: 'Penny Loafers',
        color: 'Burgundy',
        material: 'Calf Leather',
        price: 295,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEBDtMxeMEHeVPT2HiByCaa_n-H9c0n-K8VF78V1r-R1YR6EiBQaglP4EAADHJss0LO7IJGrqFZtwpOwQF0Sreb78Fd8fFDiO52MPi6JU_kVP7O15FnIDV7wBZJyMdT2wt4W3juG2MawOqQ-P7BkpRUdlcighh536TJh_nHCmFA1ivqGz-66C2x0Ce60PreakLWyhGJzwlVlBVchZnQrQYqeXLa089lGAkKwyzo9O1qmC711zcUuQiXZHvnk7QFg0AqsGHz96SY7o'
    },
    {
        id: 's2',
        category: 'shoes',
        name: 'Ankle Boots',
        color: 'Black',
        material: 'Leather',
        price: 550,
        image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2080&auto=format&fit=crop'
    },
    {
        id: 's3',
        category: 'shoes',
        name: 'Minimal Sneakers',
        color: 'White/Ecru',
        material: 'Leather',
        price: 420,
        image_url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop'
    },

    // Accessories
    {
        id: 'a1',
        category: 'accessory',
        name: 'Structured Leather Tote',
        color: 'Cognac',
        material: 'Full Grain Leather',
        price: 1890,
        image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcsWEjZScZSv2Xb2KWr82fjNDhdAPw9o0a5C696qIAXsc-9s--IBk0VJdCqB70eWGiTfp-WlRyubn4eWlAREyouejWK2RYUolPKAAfquvLgVZ4VSoMhNqlOQD1Bfclmhr_0uFq3VaJIV_cd1ryA-i1IcjDN_Ri8Pl2r3Jo4PwUMY5sLMGYaOCoNS5lfzgnaF1nvYRG0C9TRSw11G7kxdyZpp5vgNEwcDJ2R5htV4knartbJ7uKXjFT32_bMixd67kXxRvLcXxvzaw'
    },
    {
        id: 'a2',
        category: 'accessory',
        name: 'Cashmere Scarf',
        color: 'Oatmeal',
        material: 'Cashmere',
        price: 250,
        image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1887&auto=format&fit=crop'
    },
    {
        id: 'a3',
        category: 'accessory',
        name: 'Gold Link Bracelet',
        color: 'Gold',
        material: '18k Gold Plated',
        price: 320,
        image_url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop'
    }
];
