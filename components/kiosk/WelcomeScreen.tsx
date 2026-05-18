'use client'

import { motion } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { ChevronRight } from 'lucide-react'

export function WelcomeScreen() {
  const { state, dispatch } = useKiosk()
  const lang = state.language

  const handleStart = () => dispatch({ type: 'SET_SCREEN', screen: 'dine-type' })
  const setLang = (l: 'en' | 'id') => dispatch({ type: 'SET_LANGUAGE', language: l })

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] flex flex-col">
      {/* Hero image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=1920&q=80"
          alt="Japanese cuisine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50" />
      </div>

      {/* Language selector */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 flex justify-end p-8"
      >
        <div className="flex items-center gap-1 glass rounded-full p-1">
          <button
            onClick={() => setLang('en')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              lang === 'en'
                ? 'bg-[#c9a84c] text-[#0a0a0a] font-semibold'
                : 'text-[#f5f0e8]/60 hover:text-[#f5f0e8]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang('id')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              lang === 'id'
                ? 'bg-[#c9a84c] text-[#0a0a0a] font-semibold'
                : 'text-[#f5f0e8]/60 hover:text-[#f5f0e8]'
            }`}
          >
            ID
          </button>
        </div>
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-16">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-px h-8 bg-[#c9a84c]/50" />
            <span className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase">
              Premium Japanese Dining
            </span>
            <div className="w-px h-8 bg-[#c9a84c]/50" />
          </div>
          <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold text-[#f5f0e8] tracking-tight leading-none mb-2">
            KUMO
          </h1>
          <p className="gold-shimmer text-2xl font-serif italic tracking-widest">
            雲 Izakaya
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-[#f5f0e8]/50 text-lg text-center max-w-md leading-relaxed mb-16"
        >
          {t(
            'Authentic Japanese flavors crafted with precision and passion',
            'Cita rasa Jepang autentik yang dibuat dengan presisi dan passion',
            lang
          )}
        </motion.p>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="group relative flex items-center gap-4 bg-[#c9a84c] hover:bg-[#e8c96c] text-[#0a0a0a] font-bold text-xl px-12 py-5 rounded-2xl transition-all duration-300 shadow-[0_0_60px_rgba(201,168,76,0.4)]"
          style={{ minHeight: 72 }}
        >
          <span className="text-xl">
            {t('Touch to Order', 'Mulai Pesan', lang)}
          </span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-[#c9a84c]/40 scale-105 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* Admin link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'admin' })}
          className="mt-8 text-[#f5f0e8]/20 text-xs hover:text-[#c9a84c]/60 transition-colors"
        >
          Admin Dashboard
        </motion.button>
      </div>

      {/* Bottom ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#c9a84c]/10 blur-[80px] pointer-events-none" />

      {/* Floating food cards ambient */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-24 left-12 w-24 h-24 rounded-2xl overflow-hidden opacity-20 hidden lg:block"
      >
        <img src="https://images.unsplash.com/photo-1569719935036-e3f5e5e9f26e?w=200&q=80" alt="" className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-32 right-12 w-20 h-20 rounded-2xl overflow-hidden opacity-20 hidden lg:block"
      >
        <img src="https://images.unsplash.com/photo-1617345019355-aba7e2f3c05d?w=200&q=80" alt="" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  )
}
