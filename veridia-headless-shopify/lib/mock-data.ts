export const COLLECTIONS = [
  {
    id: 'skin',
    title: 'Skin Health',
    handle: 'skin',
    description: 'Targeted nutrients for a clear, glowing complexion from within.',
    image: 'https://cdn.sanity.io/images/wc4lcg7n/develop/b429c85c8af9766d8f761acbe756f178c24aba21-1560x960.jpg?w=1200&auto=format'
  },
  {
    id: 'hair',
    title: 'Hair & Nails',
    handle: 'hair',
    description: 'Support stronger, faster-growing hair and resilient nails.',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'digestion',
    title: 'Digestion & Gut',
    handle: 'digestion',
    description: 'Beat the bloat and support a healthy gut microbiome.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'mood',
    title: 'Mood & Sleep',
    handle: 'mood',
    description: 'Natural support for stress, anxiety, and restful sleep.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'
  }
];

export const PRODUCTS = [
  // Skin
  {
    id: '1',
    title: 'Daily Cleanse',
    handle: 'daily-cleanse',
    collection: 'skin',
    price: 26,
    description: 'Green detox formula to cleanse the body and support clear skin.',
    rating: 4.6,
    reviews: '2.5K',
    image: 'https://cdn.sanity.io/images/wc4lcg7n/develop/10140b8e855cc5042bdda7c742b946b566a45cfd-1200x1200.png?auto=format&w=400&h=400',
    tags: ['Detox', 'Clear Skin']
  },
  {
    id: '2',
    title: 'Red Carpet',
    handle: 'red-carpet',
    collection: 'skin',
    price: 26,
    description: 'Plant-based formula for glowing skin and shiny hair.',
    rating: 4.7,
    reviews: '1.8K',
    image: 'https://cdn.sanity.io/images/wc4lcg7n/develop/842e4c31cc11979c674148b4393f827120424e8b-1200x1200.png?auto=format&w=400&h=400',
    tags: ['Glowing Skin', 'Vegan']
  },
  // Hair
  {
    id: '3',
    title: 'Killer Nails',
    handle: 'killer-nails',
    collection: 'hair',
    price: 20,
    description: 'High-potency biotin for stronger hair and nails.',
    rating: 4.8,
    reviews: '1.2K',
    image: 'https://cdn.sanity.io/images/wc4lcg7n/develop/0a34a1f3160652621056275cd72f0def081c487f-2000x2000.jpg?auto=format&h=2000&w=2000',
    tags: ['Biotin', 'Nail Strength']
  },
  {
    id: '4',
    title: 'Hair Sweet Hair',
    handle: 'hair-sweet-hair',
    collection: 'hair',
    price: 26,
    description: 'Vegan gummies for stronger, healthier hair.',
    rating: 4.5,
    reviews: '3.1K',
    image: 'https://cdn.sanity.io/images/wc4lcg7n/develop/13b5acacacd06896e68415cebc46b0d10173ae6b-1200x1200.png?auto=format&w=400&h=400',
    tags: ['Gummies', 'Hair Growth']
  },
  // Digestion
  {
    id: '5',
    title: 'Flatter Me',
    handle: 'flatter-me',
    collection: 'digestion',
    price: 26,
    description: '18 full-spectrum digestive enzymes to support a flatter stomach.',
    rating: 4.5,
    reviews: '816',
    image: 'https://cdn.sanity.io/images/wc4lcg7n/develop/0c15b8928a4c60b0a307eac506216dcb8d6c85f7-1832x1954.png?auto=format&w=400&h=400',
    tags: ['Bloating', 'Digestion']
  },
  {
    id: '6',
    title: 'Gut Instinct',
    handle: 'gut-instinct',
    collection: 'digestion',
    price: 26,
    description: '10-strain probiotic to support a healthy gut and immune system.',
    rating: 4.7,
    reviews: '1.1K',
    image: 'https://cdn.sanity.io/images/wc4lcg7n/develop/466850cf95ccc7545e39d9d8b1a045aa78afd99c-400x400.png?auto=format&w=400&h=400',
    tags: ['Probiotics', 'Gut Health']
  }
];