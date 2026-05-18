'use client'

import { motion } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { UtensilsCrossed, ShoppingBag, ChevronLeft } from 'lucide-react'

export function DineTypeScreen() {
  const { state, dispatch } = useKiosk()
  const lang = state.language

  const handleSelect = (type: 'dine-in' | 'take-away') => {
    dispatch({ type: 'SET_DINE_TYPE', dineType: type })
    dispatch({ type: 'SET_SCREEN', screen: 'menu' })
  }

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between px-8 pt-8 pb-4"
      >
        <button
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'welcome' })}
          className="flex items-center gap-2 text-[#f5f0e8]/40 hover:text-[#c9a84c] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">{t('Back', 'Kembali', lang)}</span>
        </button>
        <div className="text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-semibold">
            {t('Step 1 of 3', 'Langkah 1 dari 3', lang)}
          </p>
        </div>
        <div className="w-20" />
      </motion.div>

      {/* Progress */}
      <div className="px-8 mb-12">
        <div className="flex gap-2">
          <div className="h-1 flex-1 rounded-full bg-[#c9a84c]" />
          <div className="h-1 flex-1 rounded-full bg-[#f5f0e8]/10" />
          <div className="h-1 flex-1 rounded-full bg-[#f5f0e8]/10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl font-bold text-[#f5f0e8] mb-4 text-balance">
            {t('How would you like your order?', 'Bagaimana Anda ingin memesan?', lang)}
          </h2>
          <p className="text-[#888880] text-lg">
            {t('Choose your dining preference below', 'Pilih preferensi makan Anda di bawah', lang)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Dine In */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('dine-in')}
            className="group relative overflow-hidden rounded-3xl border border-[rgba(201,168,76,0.15)] bg-[#111] hover:border-[#c9a84c]/50 transition-all duration-300 p-10 flex flex-col items-center gap-6 text-center"
            style={{ minHeight: 280 }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#c9a84c]/8 to-transparent" />
            {/* Background image */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 flex items-center justify-center transition-colors border border-[#c9a84c]/20">
                <UtensilsCrossed className="w-10 h-10 text-[#c9a84c]" />
              </div>
              <div>
                <h3 className="text-[#f5f0e8] text-2xl font-bold mb-2">
                  {t('Dine In', 'Makan di Sini', lang)}
                </h3>
                <p className="text-[#888880] text-base leading-relaxed">
                  {t('Enjoy your meal at our restaurant', 'Nikmati makanan Anda di restoran kami', lang)}
                </p>
              </div>
              <div className="px-6 py-3 rounded-xl bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 border border-[#c9a84c]/20 transition-colors">
                <span className="text-[#c9a84c] text-sm font-semibold tracking-wide">
                  {t('Select Table', 'Pilih Meja', lang)}
                </span>
              </div>
            </div>
          </motion.button>

          {/* Take Away */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect('take-away')}
            className="group relative overflow-hidden rounded-3xl border border-[rgba(201,168,76,0.15)] bg-[#111] hover:border-[#c9a84c]/50 transition-all duration-300 p-10 flex flex-col items-center gap-6 text-center"
            style={{ minHeight: 280 }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#c9a84c]/8 to-transparent" />
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <img
                src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 flex items-center justify-center transition-colors border border-[#c9a84c]/20">
                <ShoppingBag className="w-10 h-10 text-[#c9a84c]" />
              </div>
              <div>
                <h3 className="text-[#f5f0e8] text-2xl font-bold mb-2">
                  {t('Take Away', 'Bawa Pulang', lang)}
                </h3>
                <p className="text-[#888880] text-base leading-relaxed">
                  {t('Order to go, ready when you are', 'Pesan untuk dibawa, siap saat Anda perlu', lang)}
                </p>
              </div>
              <div className="px-6 py-3 rounded-xl bg-[#c9a84c]/10 group-hover:bg-[#c9a84c]/20 border border-[#c9a84c]/20 transition-colors">
                <span className="text-[#c9a84c] text-sm font-semibold tracking-wide">
                  {t('Pack it up', 'Kemas Sekarang', lang)}
                </span>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c9a84c]/5 blur-[120px] pointer-events-none" />
    </div>
  )
}
