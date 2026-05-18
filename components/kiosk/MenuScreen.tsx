'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { menuItems, categories, MenuItem, formatPrice } from '@/lib/mock-data'
import { Search, ShoppingCart, ChevronLeft, Flame, Star, Sparkles, Plus } from 'lucide-react'
import { ProductDetailModal } from './ProductDetailModal'
import { CartPanel } from './CartPanel'
import { AIRecommendation } from './AIRecommendation'

const badgeConfig = {
  bestseller: { label: 'Best Seller', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  new: { label: 'New', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  spicy: { label: 'Spicy', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  recommended: { label: 'Chef\'s Pick', color: 'bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30' },
}

function MenuCard({ item, onSelect }: { item: MenuItem; onSelect: (item: MenuItem) => void }) {
  const { dispatch } = useKiosk()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    const orderItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
      toppings: [],
      notes: '',
      subtotal: item.price,
    }
    dispatch({ type: 'ADD_TO_CART', item: orderItem })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(item)}
      className="group relative bg-[#111] rounded-2xl overflow-hidden border border-[rgba(201,168,76,0.1)] hover:border-[#c9a84c]/30 cursor-pointer transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {item.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${badgeConfig[item.badge].color}`}>
              {item.badge === 'spicy' && <Flame className="inline w-2.5 h-2.5 mr-1" />}
              {badgeConfig[item.badge].label}
            </span>
          )}
        </div>

        {/* Spicy indicators */}
        {item.spicyLevel && (
          <div className="absolute top-3 right-3 flex gap-0.5">
            {Array.from({ length: item.spicyLevel }).map((_, i) => (
              <Flame key={i} className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            ))}
          </div>
        )}

        {/* Quick add */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#c9a84c] text-[#0a0a0a] flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label={`Quick add ${item.name}`}
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-[#f5f0e8] font-semibold text-base leading-tight line-clamp-1">{item.name}</h3>
        </div>
        <p className="text-[#888880] text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#c9a84c] font-bold text-lg">{formatPrice(item.price)}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[#888880] text-xs">{item.rating} ({item.reviews})</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[#888880] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {item.prepTime} min
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function MenuScreen() {
  const { state, dispatch, itemCount } = useKiosk()
  const lang = state.language
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [showCart, setShowCart] = useState(false)

  const filtered = useMemo(() => {
    let items = menuItems
    if (state.activeCategory !== 'all') {
      items = items.filter((i) => i.categoryId === state.activeCategory)
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase()
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      )
    }
    return items
  }, [state.activeCategory, state.searchQuery])

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex overflow-hidden">
      {/* Sidebar categories */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-24 md:w-28 flex-shrink-0 flex flex-col items-center py-8 gap-2 border-r border-[rgba(201,168,76,0.1)] bg-[#0d0d0d]"
      >
        {/* Logo */}
        <div className="mb-4 text-center">
          <span className="font-serif text-[#c9a84c] text-xl font-bold">K</span>
        </div>

        {/* Back */}
        <button
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dine-type' })}
          className="w-16 h-10 rounded-xl flex items-center justify-center text-[#888880] hover:text-[#c9a84c] transition-colors mb-4"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* All */}
        <button
          onClick={() => dispatch({ type: 'SET_CATEGORY', category: 'all' })}
          className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all ${
            state.activeCategory === 'all'
              ? 'bg-[#c9a84c] text-[#0a0a0a]'
              : 'bg-[#1a1a1a] text-[#888880] hover:text-[#f5f0e8]'
          }`}
        >
          <span className="text-lg">🍽️</span>
          <span className="text-[9px] font-semibold">{t('All', 'Semua', lang)}</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => dispatch({ type: 'SET_CATEGORY', category: cat.id })}
            className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
              state.activeCategory === cat.id
                ? 'bg-[#c9a84c] text-[#0a0a0a]'
                : 'bg-[#1a1a1a] text-[#888880] hover:text-[#f5f0e8]'
            }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="text-[9px] font-semibold leading-tight text-center px-1 line-clamp-1">
              {lang === 'en' ? cat.name : cat.nameId}
            </span>
          </button>
        ))}
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-[rgba(201,168,76,0.1)] bg-[#0a0a0a]/80 backdrop-blur-sm">
          {/* Search */}
          <div className="flex-1 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888880]" />
            <input
              type="text"
              placeholder={t('Search menu...', 'Cari menu...', lang)}
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', query: e.target.value })}
              className="w-full h-12 pl-11 pr-4 bg-[#1a1a1a] border border-[rgba(201,168,76,0.1)] rounded-xl text-[#f5f0e8] placeholder:text-[#888880] text-sm outline-none focus:border-[#c9a84c]/40 transition-colors"
            />
          </div>

          {/* Category title */}
          <div className="hidden md:flex flex-col">
            <p className="text-[#888880] text-xs uppercase tracking-wider">
              {state.activeCategory === 'all'
                ? t('All Items', 'Semua Menu', lang)
                : categories.find((c) => c.id === state.activeCategory)?.name}
            </p>
            <p className="text-[#f5f0e8] font-semibold text-sm">{filtered.length} {t('items', 'item', lang)}</p>
          </div>

          {/* Cart button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-3 bg-[#c9a84c] text-[#0a0a0a] font-bold px-6 py-3.5 rounded-xl transition-colors hover:bg-[#e8c96c]"
            style={{ minHeight: 56 }}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden md:block">{t('Cart', 'Keranjang', lang)}</span>
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 1.4 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-[#0a0a0a] text-[#c9a84c] text-xs font-bold flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Menu grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="text-5xl">🔍</div>
              <p className="text-[#888880] text-lg">{t('No items found', 'Item tidak ditemukan', lang)}</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <MenuCard key={item.id} item={item} onSelect={setSelectedItem} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Cart panel */}
      <AnimatePresence>
        {showCart && <CartPanel onClose={() => setShowCart(false)} />}
      </AnimatePresence>

      {/* Product detail modal */}
      <AnimatePresence>
        {selectedItem && <ProductDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>

      {/* AI Recommendation */}
      <AIRecommendation onSelectItem={setSelectedItem} />

      {/* Floating cart indicator (mobile / when cart is closed) */}
      {itemCount > 0 && !showCart && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setShowCart(true)}
          className="fixed bottom-8 right-8 flex items-center gap-3 bg-[#c9a84c] text-[#0a0a0a] font-bold px-6 py-4 rounded-2xl shadow-[0_8px_40px_rgba(201,168,76,0.4)] z-40 md:hidden"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{itemCount} {t('items', 'item', lang)}</span>
          <Sparkles className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  )
}
