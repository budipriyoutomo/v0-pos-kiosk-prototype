'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { CheckCircle2, RotateCcw, Clock, ChefHat } from 'lucide-react'

function Confetti() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    color: ['#c9a84c', '#e8c96c', '#f5f0e8', '#a07830'][Math.floor(Math.random() * 4)],
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}%`, opacity: 1, scale: 1 }}
          animate={{ y: '110vh', opacity: 0, scale: 0.5, rotate: 360 * 3 }}
          transition={{ duration: 3 + Math.random() * 2, delay: p.delay, ease: 'easeIn' }}
          className="absolute top-0 w-2 h-2 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  )
}

export function SuccessScreen() {
  const { state, dispatch } = useKiosk()
  const lang = state.language
  const [timer, setTimer] = useState(30)
  const prepTime = state.cart.reduce((max, item) => Math.max(max, item.menuItem.prepTime), 0) + 5

  useEffect(() => {
    if (timer <= 0) {
      handleReset()
      return
    }
    const t = setTimeout(() => setTimer((v) => v - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])

  const handleReset = () => {
    dispatch({ type: 'CLEAR_CART' })
    dispatch({ type: 'SET_SCREEN', screen: 'welcome' })
  }

  const steps = [
    { label: t('Order Received', 'Pesanan Diterima', lang), done: true },
    { label: t('Preparing', 'Sedang Dimasak', lang), done: false },
    { label: t('Ready to Serve', 'Siap Disajikan', lang), done: false },
  ]

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center px-8 overflow-hidden">
      <Confetti />

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="mb-6"
      >
        <div className="w-28 h-28 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-10"
      >
        <h1 className="font-serif text-5xl font-bold text-[#f5f0e8] mb-3 text-balance">
          {t('Order Placed!', 'Pesanan Berhasil!', lang)}
        </h1>
        <p className="text-[#888880] text-lg">
          {t('Thank you for dining with us.', 'Terima kasih telah memesan di sini.', lang)}
        </p>
      </motion.div>

      {/* Queue number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        className="bg-[#111] rounded-3xl border border-[rgba(201,168,76,0.2)] p-8 text-center mb-8 w-full max-w-md"
      >
        <p className="text-[#888880] text-sm uppercase tracking-widest mb-2">
          {t('Queue Number', 'Nomor Antrian', lang)}
        </p>
        <p className="gold-shimmer font-serif text-8xl font-bold mb-1">
          #{state.orderNumber || '42'}
        </p>
        <div className="flex items-center justify-center gap-2 text-[#888880] text-sm mt-3">
          <Clock className="w-4 h-4 text-[#c9a84c]" />
          <span>{t('Estimated prep time', 'Perkiraan waktu masak', lang)}:</span>
          <span className="text-[#c9a84c] font-semibold">{prepTime} min</span>
        </div>
      </motion.div>

      {/* Progress steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-4 mb-10 w-full max-w-md"
      >
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`flex flex-col items-center gap-1.5 flex-1 ${i < steps.length - 1 ? 'relative' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.done
                  ? 'bg-emerald-500 border-emerald-500'
                  : i === 1
                  ? 'border-[#c9a84c] bg-[#c9a84c]/10'
                  : 'border-[#1a1a1a] bg-transparent'
              }`}>
                {step.done ? (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                ) : i === 1 ? (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]"
                  />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
                )}
              </div>
              <span className={`text-[10px] text-center font-medium ${
                step.done ? 'text-emerald-400' : i === 1 ? 'text-[#c9a84c]' : 'text-[#888880]'
              }`}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 mb-4 ${i === 0 ? 'bg-emerald-500/50' : 'bg-[#1a1a1a]'}`} />
            )}
          </div>
        ))}
      </motion.div>

      {/* CTA & auto reset */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center space-y-4 w-full max-w-xs"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-3 bg-[#c9a84c] hover:bg-[#e8c96c] text-[#0a0a0a] font-bold py-4 rounded-2xl transition-colors shadow-[0_0_30px_rgba(201,168,76,0.3)]"
          style={{ minHeight: 60 }}
        >
          <RotateCcw className="w-5 h-5" />
          {t('Order Again', 'Pesan Lagi', lang)}
        </motion.button>

        <p className="text-[#888880] text-xs">
          {t('Auto reset in', 'Reset otomatis dalam', lang)}{' '}
          <span className="text-[#c9a84c] font-semibold">{timer}s</span>
        </p>
      </motion.div>

      {/* Chef icon decoration */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 right-10 text-[#c9a84c]/10"
      >
        <ChefHat className="w-24 h-24" />
      </motion.div>

      {/* Gold ambient */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-[#c9a84c]/5 blur-[120px]" />
      </div>
    </div>
  )
}
