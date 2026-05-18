export type Category = {
  id: string
  name: string
  nameId: string
  icon: string
  count: number
}

export type MenuItem = {
  id: string
  categoryId: string
  name: string
  nameId: string
  description: string
  descriptionId: string
  price: number
  image: string
  badge?: 'bestseller' | 'new' | 'spicy' | 'recommended'
  spicyLevel?: 1 | 2 | 3
  isAvailable: boolean
  prepTime: number
  tags: string[]
  variants?: {
    sizes?: { label: string; price: number }[]
    spicy?: { label: string; labelId: string }[]
    toppings?: { label: string; price: number }[]
  }
  rating: number
  reviews: number
}

export type OrderItem = {
  id: string
  menuItem: MenuItem
  quantity: number
  size?: string
  spicyLevel?: string
  toppings: string[]
  notes: string
  subtotal: number
}

export const categories: Category[] = [
  { id: 'sushi', name: 'Sushi', nameId: 'Sushi', icon: '🍣', count: 4 },
  { id: 'ramen', name: 'Ramen', nameId: 'Ramen', icon: '🍜', count: 3 },
  { id: 'donburi', name: 'Donburi', nameId: 'Donburi', icon: '🍚', count: 3 },
  { id: 'drinks', name: 'Drinks', nameId: 'Minuman', icon: '🍵', count: 3 },
  { id: 'dessert', name: 'Dessert', nameId: 'Dessert', icon: '🍨', count: 2 },
]

export const menuItems: MenuItem[] = [
  // Sushi
  {
    id: 'sushi-001',
    categoryId: 'sushi',
    name: 'Omakase Nigiri Set',
    nameId: 'Set Nigiri Omakase',
    description: 'Chef\'s selection of 8 premium nigiri with aged soy and wasabi. Daily seasonal fish from Tsukiji.',
    descriptionId: 'Pilihan koki 8 nigiri premium dengan kecap asin matang dan wasabi. Ikan musiman harian dari Tsukiji.',
    price: 185000,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80',
    badge: 'bestseller',
    isAvailable: true,
    prepTime: 12,
    tags: ['premium', 'fresh', 'seasonal'],
    rating: 4.9,
    reviews: 284,
    variants: {
      sizes: [
        { label: '8 pcs', price: 0 },
        { label: '12 pcs', price: 65000 },
        { label: '16 pcs', price: 120000 },
      ],
    },
  },
  {
    id: 'sushi-002',
    categoryId: 'sushi',
    name: 'Dragon Roll',
    nameId: 'Dragon Roll',
    description: 'Prawn tempura, avocado, cucumber topped with unagi and tobiko. Sweet eel sauce finish.',
    descriptionId: 'Udang tempura, alpukat, mentimun ditutup unagi dan tobiko. Finishing saus sidat manis.',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80',
    badge: 'recommended',
    isAvailable: true,
    prepTime: 10,
    tags: ['roll', 'cooked', 'sweet'],
    rating: 4.8,
    reviews: 197,
    variants: {
      toppings: [
        { label: 'Extra Tobiko', price: 15000 },
        { label: 'Extra Avocado', price: 12000 },
        { label: 'Truffle Oil', price: 25000 },
      ],
    },
  },
  {
    id: 'sushi-003',
    categoryId: 'sushi',
    name: 'Spicy Tuna Roll',
    nameId: 'Spicy Tuna Roll',
    description: 'Fresh tuna, spicy mayo, cucumber, topped with sriracha drizzle and crispy onions.',
    descriptionId: 'Tuna segar, mayo pedas, mentimun, disiram sriracha dan bawang goreng renyah.',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=80',
    badge: 'spicy',
    spicyLevel: 2,
    isAvailable: true,
    prepTime: 8,
    tags: ['spicy', 'tuna', 'roll'],
    rating: 4.7,
    reviews: 156,
    variants: {
      spicy: [
        { label: 'Mild', labelId: 'Tidak Pedas' },
        { label: 'Medium', labelId: 'Sedang' },
        { label: 'Hot', labelId: 'Pedas' },
        { label: 'Extra Hot', labelId: 'Sangat Pedas' },
      ],
    },
  },
  {
    id: 'sushi-004',
    categoryId: 'sushi',
    name: 'Salmon Sashimi',
    nameId: 'Sashimi Salmon',
    description: 'Premium Norwegian salmon, thinly sliced, served with grated daikon and ponzu.',
    descriptionId: 'Salmon Norwegia premium, iris tipis, disajikan dengan daikon parut dan ponzu.',
    price: 165000,
    image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=600&q=80',
    badge: 'new',
    isAvailable: true,
    prepTime: 5,
    tags: ['premium', 'raw', 'fresh'],
    rating: 4.9,
    reviews: 89,
    variants: {
      sizes: [
        { label: '5 pcs', price: 0 },
        { label: '10 pcs', price: 120000 },
      ],
    },
  },
  // Ramen
  {
    id: 'ramen-001',
    categoryId: 'ramen',
    name: 'Tonkotsu Black',
    nameId: 'Tonkotsu Hitam',
    description: '18-hour pork bone broth, black garlic oil, chashu pork belly, soft egg, bamboo shoots.',
    descriptionId: 'Kaldu tulang babi 18 jam, minyak bawang hitam, chashu perut babi, telur lembut, rebung.',
    price: 135000,
    image: 'https://images.unsplash.com/photo-1569719935036-e3f5e5e9f26e?w=600&q=80',
    badge: 'bestseller',
    isAvailable: true,
    prepTime: 15,
    tags: ['rich', 'pork', 'creamy'],
    rating: 4.9,
    reviews: 342,
    variants: {
      spicy: [
        { label: 'Original', labelId: 'Original' },
        { label: 'Spicy', labelId: 'Pedas' },
        { label: 'Extra Spicy', labelId: 'Sangat Pedas' },
      ],
      toppings: [
        { label: 'Extra Chashu', price: 25000 },
        { label: 'Extra Egg', price: 15000 },
        { label: 'Corn', price: 8000 },
        { label: 'Nori', price: 5000 },
      ],
    },
  },
  {
    id: 'ramen-002',
    categoryId: 'ramen',
    name: 'Shoyu Ramen',
    nameId: 'Ramen Shoyu',
    description: 'Clear chicken-soy broth, wavy noodles, chicken chashu, menma, narutomaki, scallions.',
    descriptionId: 'Kaldu ayam-kecap bening, mie bergelombang, chashu ayam, menma, narutomaki, daun bawang.',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=600&q=80',
    isAvailable: true,
    prepTime: 12,
    tags: ['light', 'chicken', 'clear'],
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 'ramen-003',
    categoryId: 'ramen',
    name: 'Spicy Miso Ramen',
    nameId: 'Ramen Miso Pedas',
    description: 'Hokkaido red miso broth, ground pork, corn, butter, bean sprouts, spicy paste.',
    descriptionId: 'Kaldu miso merah Hokkaido, daging babi cincang, jagung, mentega, tauge, pasta pedas.',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&q=80',
    badge: 'spicy',
    spicyLevel: 3,
    isAvailable: true,
    prepTime: 13,
    tags: ['spicy', 'miso', 'hearty'],
    rating: 4.8,
    reviews: 211,
    variants: {
      spicy: [
        { label: 'Mild', labelId: 'Tidak Pedas' },
        { label: 'Medium', labelId: 'Sedang' },
        { label: 'Hot', labelId: 'Pedas' },
        { label: 'Inferno', labelId: 'Paling Pedas' },
      ],
    },
  },
  // Donburi
  {
    id: 'donburi-001',
    categoryId: 'donburi',
    name: 'Wagyu Beef Don',
    nameId: 'Wagyu Beef Don',
    description: 'A5 Wagyu slices on steamed rice, onsen egg, dashi sauce, shiso, sesame.',
    descriptionId: 'Irisan Wagyu A5 di atas nasi kukus, telur onsen, saus dashi, shiso, wijen.',
    price: 245000,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    badge: 'recommended',
    isAvailable: true,
    prepTime: 10,
    tags: ['wagyu', 'premium', 'beef'],
    rating: 5.0,
    reviews: 127,
    variants: {
      sizes: [
        { label: 'Regular', price: 0 },
        { label: 'Large', price: 45000 },
      ],
    },
  },
  {
    id: 'donburi-002',
    categoryId: 'donburi',
    name: 'Salmon Ikura Don',
    nameId: 'Salmon Ikura Don',
    description: 'Fresh salmon, salmon roe, cucumber, seaweed, sushi rice, wasabi mayo.',
    descriptionId: 'Salmon segar, telur salmon, mentimun, rumput laut, nasi sushi, mayo wasabi.',
    price: 175000,
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80',
    badge: 'new',
    isAvailable: true,
    prepTime: 8,
    tags: ['salmon', 'roe', 'fresh'],
    rating: 4.8,
    reviews: 94,
  },
  {
    id: 'donburi-003',
    categoryId: 'donburi',
    name: 'Chicken Katsu Don',
    nameId: 'Chicken Katsu Don',
    description: 'Crispy panko chicken, egg, onion, dashi-soy sauce over Japanese rice. Soul food.',
    descriptionId: 'Ayam panko crispy, telur, bawang, saus dashi-kecap di atas nasi Jepang.',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1598514982901-3e7e3e987cc1?w=600&q=80',
    badge: 'bestseller',
    isAvailable: true,
    prepTime: 12,
    tags: ['chicken', 'crispy', 'comfort'],
    rating: 4.7,
    reviews: 315,
  },
  // Drinks
  {
    id: 'drink-001',
    categoryId: 'drinks',
    name: 'Ceremonial Matcha Latte',
    nameId: 'Matcha Latte Seremonial',
    description: 'First flush ceremonial grade matcha, steamed oat milk, light foam. Pure umami.',
    descriptionId: 'Matcha kelas seremonial panen pertama, susu oat kukus, busa ringan. Umami murni.',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1617345019355-aba7e2f3c05d?w=600&q=80',
    badge: 'bestseller',
    isAvailable: true,
    prepTime: 5,
    tags: ['matcha', 'hot', 'cold'],
    rating: 4.9,
    reviews: 428,
    variants: {
      sizes: [
        { label: 'Regular (300ml)', price: 0 },
        { label: 'Large (500ml)', price: 15000 },
      ],
      spicy: [
        { label: 'Hot', labelId: 'Panas' },
        { label: 'Iced', labelId: 'Es' },
      ],
    },
  },
  {
    id: 'drink-002',
    categoryId: 'drinks',
    name: 'Yuzu Lemonade',
    nameId: 'Lemonade Yuzu',
    description: 'Fresh yuzu citrus, honey, sparkling water, shiso leaf. Refreshing Japanese citrus.',
    descriptionId: 'Yuzu citrus segar, madu, air sparkling, daun shiso. Citrus Jepang menyegarkan.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    badge: 'new',
    isAvailable: true,
    prepTime: 3,
    tags: ['cold', 'citrus', 'refreshing'],
    rating: 4.7,
    reviews: 183,
  },
  {
    id: 'drink-003',
    categoryId: 'drinks',
    name: 'Hojicha Cold Brew',
    nameId: 'Cold Brew Hojicha',
    description: 'Roasted green tea cold brewed 24 hours, hint of caramel, smoky and smooth.',
    descriptionId: 'Teh hijau sangrai cold brew 24 jam, sentuhan karamel, smoky dan halus.',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    isAvailable: true,
    prepTime: 2,
    tags: ['cold', 'tea', 'roasted'],
    rating: 4.6,
    reviews: 142,
  },
  // Dessert
  {
    id: 'dessert-001',
    categoryId: 'dessert',
    name: 'Matcha Mochi Ice Cream',
    nameId: 'Es Krim Mochi Matcha',
    description: 'Handmade mochi shell, ceremonial matcha ice cream, red bean paste filling.',
    descriptionId: 'Kulit mochi buatan tangan, es krim matcha seremonial, isian pasta kacang merah.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
    badge: 'bestseller',
    isAvailable: true,
    prepTime: 3,
    tags: ['cold', 'sweet', 'matcha'],
    rating: 4.9,
    reviews: 267,
    variants: {
      sizes: [
        { label: '2 pcs', price: 0 },
        { label: '4 pcs', price: 60000 },
        { label: '6 pcs', price: 110000 },
      ],
    },
  },
  {
    id: 'dessert-002',
    categoryId: 'dessert',
    name: 'Crème Brûlée Matcha',
    nameId: 'Crème Brûlée Matcha',
    description: 'Classic French crème brûlée infused with Japanese matcha, torched caramel top.',
    descriptionId: 'Crème brûlée Prancis klasik diinfus matcha Jepang, bagian atas karamel dipanggang.',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600&q=80',
    badge: 'new',
    isAvailable: true,
    prepTime: 5,
    tags: ['warm', 'sweet', 'french-japanese'],
    rating: 4.8,
    reviews: 134,
  },
]

export const mockOrders = [
  { id: 'ORD-0042', items: 3, total: 395000, status: 'preparing', time: '12 min', table: 'Dine In' },
  { id: 'ORD-0041', items: 2, total: 230000, status: 'ready', time: '0 min', table: 'Take Away' },
  { id: 'ORD-0040', items: 5, total: 620000, status: 'preparing', time: '8 min', table: 'Dine In' },
  { id: 'ORD-0039', items: 1, total: 135000, status: 'done', time: '-', table: 'Dine In' },
]

export const mockAnalytics = {
  todaySales: 4850000,
  todayOrders: 37,
  avgOrderValue: 131081,
  topItems: [
    { name: 'Tonkotsu Black', orders: 24, revenue: 3240000 },
    { name: 'Omakase Nigiri', orders: 18, revenue: 3330000 },
    { name: 'Wagyu Beef Don', orders: 15, revenue: 3675000 },
    { name: 'Matcha Latte', orders: 42, revenue: 2730000 },
    { name: 'Dragon Roll', orders: 21, revenue: 3045000 },
  ],
  hourlyData: [
    { hour: '10', sales: 280000 },
    { hour: '11', sales: 420000 },
    { hour: '12', sales: 890000 },
    { hour: '13', sales: 1050000 },
    { hour: '14', sales: 640000 },
    { hour: '15', sales: 320000 },
    { hour: '16', sales: 180000 },
    { hour: '17', sales: 430000 },
    { hour: '18', sales: 640000 },
  ],
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
