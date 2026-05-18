'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { formatPrice } from '@/lib/mock-data'
import { X, Plus, Minus, Trash2, Tag, Clock, ChevronRight } from 'lucide-react'

const PROMO_CODES: Record<string, number> = {
  KUMO10: 0.1,
  KUMO20: 0.2,
  WELCOME: 0.15,
}

export function CartPanel({ onClose }: { onClose: () => void }) {
  const { state, dispatch, subtotal, tax, serviceCharge, total, itemCount } = useKiosk()
  const lang = state.language
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  const applyPromo = () => {
    const code = promoInput.toUpperCase()
    if (PROMO_CODES[code]) {
      const discount = Math.round(subtotal * PROMO_CODES[code])
      dispatch({ type: 'SET_PROMO', code, discount })
      setPromoError('')
    } else {
      setPromoError(t('Invalid promo code', 'Kode promo tidak valid', lang))
    }
  }

  const estimatedTime = state.cart.reduce((max, item) => Math.max(max, item.menuItem.prepTime), 0) + 5

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#0d0d0d] border-l border-[rgba(201,168,76,0.15)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(201,168,76,0.1)]">
          <div>
            <h2 className="text-[#f5f0e8] text-xl font-bold">
              {t('Your Order', 'Pesanan Anda', lang)}
            </h2>
            <p className="text-[#888880] text-sm">
              {itemCount} {t('items', 'item', lang)} ·{' '}
              {state.dineType === 'dine-in' ? t('Dine In', 'Makan di Sini', lang) : t('Take Away', 'Bawa Pulang', lang)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#888880] hover:text-[#f5f0e8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {state.cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <span className="text-5xl">🛒</span>
              <p className="text-[#888880] text-center">
                {t('Your cart is empty.\nStart adding delicious items!', 'Keranjang kosong.\nMulai tambahkan menu lezat!', lang)}
              </p>
            </div>
          ) : (
            state.cart.map((orderItem) => (
              <motion.div
                key={orderItem.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-3 bg-[#111] rounded-2xl p-3 border border-[rgba(201,168,76,0.08)]"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={orderItem.menuItem.image}
                    alt={orderItem.menuItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#f5f0e8] font-semibold text-sm line-clamp-1">{orderItem.menuItem.name}</p>
                  {(orderItem.size || orderItem.spicyLevel) && (
                    <p className="text-[#888880] text-xs mt-0.5">
                      {[orderItem.size, orderItem.spicyLevel].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  {orderItem.toppings.length > 0 && (
                    <p className="text-[#888880] text-xs">{orderItem.toppings.join(', ')}</p>
                  )}
                  <p className="text-[#c9a84c] font-bold text-sm mt-1">{formatPrice(orderItem.subtotal)}</p>
                </div>
                <div className="flex flex-col items-end justify-between gap-2">
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: orderItem.id })}
                    className="text-[#888880] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_CART_ITEM', id: orderItem.id, quantity: orderItem.quantity - 1 })}
                      className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#f5f0e8] hover:bg-[#c9a84c]/10"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[#f5f0e8] font-bold text-sm w-5 text-center">{orderItem.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_CART_ITEM', id: orderItem.id, quantity: orderItem.quantity + 1 })}
                      className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#f5f0e8] hover:bg-[#c9a84c]/10"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {state.cart.length > 0 && (
          <div className="px-6 py-4 border-t border-[rgba(201,168,76,0.1)] space-y-4">
            {/* Estimated time */}
            <div className="flex items-center gap-2 text-[#888880] text-sm">
              <Clock className="w-4 h-4 text-[#c9a84c]" />
              <span>{t('Estimated wait:', 'Perkiraan waktu:', lang)}</span>
              <span className="text-[#c9a84c] font-semibold">{estimatedTime} min</span>
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888880]" />
                <input
                  type="text"
                  placeholder={t('Promo code', 'Kode promo', lang)}
                  value={promoInput}
                  onChange={(e) => { setPromoInput(e.target.value); setPromoError('') }}
                  className="w-full h-11 pl-9 pr-3 bg-[#1a1a1a] border border-[rgba(201,168,76,0.15)] rounded-xl text-[#f5f0e8] text-sm placeholder:text-[#888880] outline-none focus:border-[#c9a84c]/40 uppercase"
                />
              </div>
              <button
                onClick={applyPromo}
                className="px-4 h-11 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] font-semibold text-sm rounded-xl hover:bg-[#c9a84c]/20 transition-colors"
              >
                {t('Apply', 'Pakai', lang)}
              </button>
            </div>
            {promoError && <p className="text-red-400 text-xs">{promoError}</p>}
            {state.promoDiscount > 0 && (
              <p className="text-emerald-400 text-xs">
                🎉 {t('Promo applied!', 'Promo diterapkan!')} -{formatPrice(state.promoDiscount)}
              </p>
            )}

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#888880]">
                <span>{t('Subtotal', 'Subtotal', lang)}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#888880]">
                <span>{t('Tax (11%)', 'Pajak (11%)', lang)}</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-[#888880]">
                <span>{t('Service (5%)', 'Servis (5%)', lang)}</span>
                <span>{formatPrice(serviceCharge)}</span>
              </div>
              {state.promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>{t('Discount', 'Diskon', lang)}</span>
                  <span>-{formatPrice(state.promoDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#f5f0e8] font-bold text-base pt-2 border-t border-[rgba(201,168,76,0.1)]">
                <span>{t('Total', 'Total', lang)}</span>
                <span className="text-[#c9a84c]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { dispatch({ type: 'SET_SCREEN', screen: 'checkout' }); onClose() }}
              className="w-full flex items-center justify-between bg-[#c9a84c] hover:bg-[#e8c96c] text-[#0a0a0a] font-bold px-6 py-4 rounded-2xl transition-colors"
              style={{ minHeight: 56 }}
            >
              <span>{t('Proceed to Checkout', 'Lanjut ke Pembayaran', lang)}</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
