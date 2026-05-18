'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { MenuItem, formatPrice } from '@/lib/mock-data'
import { X, Plus, Minus, Star, Clock, Flame, ShoppingCart } from 'lucide-react'

export function ProductDetailModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { state, dispatch } = useKiosk()
  const lang = state.language
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(item.variants?.sizes?.[0]?.label ?? '')
  const [selectedSpicy, setSelectedSpicy] = useState(item.variants?.spicy?.[0]?.label ?? '')
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  const sizeExtra = item.variants?.sizes?.find((s) => s.label === selectedSize)?.price ?? 0
  const toppingExtra = selectedToppings.reduce((sum, t) => {
    const tp = item.variants?.toppings?.find((tp) => tp.label === t)
    return sum + (tp?.price ?? 0)
  }, 0)
  const unitPrice = item.price + sizeExtra + toppingExtra
  const total = unitPrice * quantity

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    )
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity,
        size: selectedSize || undefined,
        spicyLevel: selectedSpicy || undefined,
        toppings: selectedToppings,
        notes,
        subtotal: total,
      },
    })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] bg-[#111] rounded-3xl overflow-hidden border border-[rgba(201,168,76,0.15)] flex flex-col"
      >
        {/* Image */}
        <div className="relative h-56 md:h-72 flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-[#f5f0e8] hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {/* Badges */}
          {item.badge && (
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#c9a84c] text-[#0a0a0a]">
                {item.badge === 'bestseller' ? 'Best Seller' : item.badge === 'new' ? 'New' : item.badge === 'spicy' ? '🌶 Spicy' : "Chef's Pick"}
              </span>
            </div>
          )}
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title & Meta */}
          <div>
            <h2 className="text-[#f5f0e8] text-2xl font-bold mb-1">{item.name}</h2>
            <div className="flex items-center gap-4 text-sm text-[#888880]">
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {item.rating} · {item.reviews} reviews
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {item.prepTime} min
              </span>
              {item.spicyLevel && (
                <span className="flex items-center gap-1">
                  {Array.from({ length: item.spicyLevel }).map((_, i) => (
                    <Flame key={i} className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  ))}
                </span>
              )}
            </div>
            <p className="text-[#888880] text-sm mt-3 leading-relaxed">
              {lang === 'en' ? item.description : item.descriptionId}
            </p>
          </div>

          {/* Size variants */}
          {item.variants?.sizes && (
            <div>
              <p className="text-[#f5f0e8] font-semibold mb-3 text-sm uppercase tracking-wide">
                {t('Size', 'Ukuran', lang)}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.variants.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      selectedSize === size.label
                        ? 'bg-[#c9a84c] border-[#c9a84c] text-[#0a0a0a]'
                        : 'border-[rgba(201,168,76,0.2)] text-[#888880] hover:border-[#c9a84c]/40 hover:text-[#f5f0e8]'
                    }`}
                  >
                    {size.label}
                    {size.price > 0 && <span className="ml-1 opacity-70">+{formatPrice(size.price)}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spicy variants */}
          {item.variants?.spicy && (
            <div>
              <p className="text-[#f5f0e8] font-semibold mb-3 text-sm uppercase tracking-wide">
                {t('Spice Level', 'Level Pedas', lang)}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.variants.spicy.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSpicy(s.label)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      selectedSpicy === s.label
                        ? 'bg-[#c9a84c] border-[#c9a84c] text-[#0a0a0a]'
                        : 'border-[rgba(201,168,76,0.2)] text-[#888880] hover:border-[#c9a84c]/40 hover:text-[#f5f0e8]'
                    }`}
                  >
                    {lang === 'en' ? s.label : s.labelId}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Toppings */}
          {item.variants?.toppings && (
            <div>
              <p className="text-[#f5f0e8] font-semibold mb-3 text-sm uppercase tracking-wide">
                {t('Add Toppings', 'Tambah Topping', lang)}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.variants.toppings.map((tp) => (
                  <button
                    key={tp.label}
                    onClick={() => toggleTopping(tp.label)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      selectedToppings.includes(tp.label)
                        ? 'bg-[#c9a84c]/20 border-[#c9a84c]/60 text-[#c9a84c]'
                        : 'border-[rgba(201,168,76,0.2)] text-[#888880] hover:border-[#c9a84c]/40 hover:text-[#f5f0e8]'
                    }`}
                  >
                    {tp.label}
                    <span className="ml-1 opacity-70 text-xs">+{formatPrice(tp.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <p className="text-[#f5f0e8] font-semibold mb-3 text-sm uppercase tracking-wide">
              {t('Special Notes', 'Catatan Khusus', lang)}
            </p>
            <textarea
              placeholder={t('Allergies, preferences...', 'Alergi, preferensi...', lang)}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-[#1a1a1a] border border-[rgba(201,168,76,0.15)] rounded-xl px-4 py-3 text-[#f5f0e8] text-sm placeholder:text-[#888880] outline-none focus:border-[#c9a84c]/40 resize-none transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[rgba(201,168,76,0.1)] bg-[#0d0d0d]">
          <div className="flex items-center gap-4">
            {/* Quantity */}
            <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-1 border border-[rgba(201,168,76,0.15)]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-[#f5f0e8] hover:bg-[#c9a84c]/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-[#f5f0e8] font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#f5f0e8] hover:bg-[#c9a84c]/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to cart */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-between bg-[#c9a84c] hover:bg-[#e8c96c] text-[#0a0a0a] font-bold px-6 py-4 rounded-xl transition-colors"
              style={{ minHeight: 56 }}
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                {t('Add to Cart', 'Tambah ke Keranjang', lang)}
              </span>
              <span className="text-lg">{formatPrice(total)}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
