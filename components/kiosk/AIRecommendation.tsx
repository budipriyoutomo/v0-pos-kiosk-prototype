'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { menuItems, MenuItem, formatPrice } from '@/lib/mock-data'
import { Sparkles, X, Plus, ChevronRight } from 'lucide-react'

export function AIRecommendation({ onSelectItem }: { onSelectItem: (item: MenuItem) => void }) {
  const { state, dispatch } = useKiosk()
  const lang = state.language
  const [expanded, setExpanded] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const recommendations = useMemo(() => {
    const cartCategoryIds = state.cart.map((item) => item.menuItem.categoryId)
    const cartIds = state.cart.map((item) => item.menuItem.id)
    
    // Recommend items from categories not yet in cart
    const notInCart = menuItems.filter((item) => !cartIds.includes(item.id))
    const newCategories = notInCart.filter((item) => !cartCategoryIds.includes(item.categoryId))
    
    if (newCategories.length >= 3) return newCategories.slice(0, 3)
    
    // Fallback: best sellers
    return notInCart
      .filter((item) => item.badge === 'bestseller' || item.badge === 'recommended')
      .slice(0, 3)
  }, [state.cart])

  const quickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        toppings: [],
        notes: '',
        subtotal: item.price,
      },
    })
  }

  if (dismissed || state.cart.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-8 left-8 z-30 max-w-xs w-full"
    >
      <div className="glass-dark rounded-2xl border border-[rgba(201,168,76,0.2)] overflow-hidden shadow-2xl">
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
            </div>
            <div>
              <p className="text-[#f5f0e8] text-xs font-bold">
                {t('Recommended For You', 'Rekomendasi Untukmu', lang)}
              </p>
              <p className="text-[#888880] text-[10px]">
                {t('Based on your order', 'Berdasarkan pesananmu', lang)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <motion.div animate={{ rotate: expanded ? 90 : 0 }}>
              <ChevronRight className="w-4 h-4 text-[#888880]" />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); setDismissed(true) }}
              className="w-6 h-6 flex items-center justify-center text-[#888880] hover:text-[#f5f0e8] ml-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Items */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-3 space-y-2 border-t border-[rgba(201,168,76,0.1)]">
                {recommendations.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 group cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#f5f0e8] text-xs font-semibold line-clamp-1">{item.name}</p>
                      <p className="text-[#c9a84c] text-xs font-bold">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      onClick={(e) => quickAdd(item, e)}
                      className="w-7 h-7 rounded-lg bg-[#c9a84c]/20 hover:bg-[#c9a84c] flex items-center justify-center text-[#c9a84c] hover:text-[#0a0a0a] transition-all flex-shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
