'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { formatPrice } from '@/lib/mock-data'
import { CheckCircle2, RefreshCw, Smartphone, Clock } from 'lucide-react'

function QRCode() {
  // Generate a fake QR-like grid
  const size = 12
  const grid = Array.from({ length: size * size }, (_, i) => {
    const row = Math.floor(i / size)
    const col = i % size
    // Corners
    if ((row < 3 && col < 3) || (row < 3 && col >= size - 3) || (row >= size - 3 && col < 3)) {
      return 'fill'
    }
    return Math.random() > 0.5 ? 'fill' : 'empty'
  })

  return (
    <div className="w-48 h-48 bg-white p-3 rounded-xl flex items-center justify-center">
      <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: '100%', height: '100%' }}>
        {grid.map((cell, i) => (
          <div
            key={i}
            className={`rounded-[1px] ${cell === 'fill' ? 'bg-black' : 'bg-white'}`}
          />
        ))}
      </div>
    </div>
  )
}

export function PaymentScreen() {
  const { state, dispatch, total } = useKiosk()
  const lang = state.language
  const [countdown, setCountdown] = useState(60)
  const [processing, setProcessing] = useState(false)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    if (paid || processing) return
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, paid, processing])

  const handleSimulatePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setPaid(true)
      const orderNum = `${Math.floor(Math.random() * 80) + 20}`
      dispatch({ type: 'SET_ORDER_NUMBER', number: orderNum })
      setTimeout(() => {
        dispatch({ type: 'SET_SCREEN', screen: 'success' })
      }, 1800)
    }, 2000)
  }

  const isCashier = state.paymentMethod === 'cashier'
  const isQris = state.paymentMethod === 'qris'

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center px-8">
      <AnimatePresence mode="wait">
        {processing && !paid ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-full border-4 border-[#1a1a1a] border-t-[#c9a84c] mx-auto mb-6"
            />
            <p className="text-[#f5f0e8] text-2xl font-bold mb-2">
              {t('Processing Payment...', 'Memproses Pembayaran...', lang)}
            </p>
            <p className="text-[#888880]">
              {t('Please wait a moment', 'Mohon tunggu sebentar', lang)}
            </p>
          </motion.div>
        ) : paid ? (
          <motion.div
            key="paid"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            >
              <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto mb-4" />
            </motion.div>
            <p className="text-[#f5f0e8] text-3xl font-bold">
              {t('Payment Confirmed!', 'Pembayaran Terkonfirmasi!', lang)}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-lg"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-[#c9a84c] text-sm font-semibold tracking-wider uppercase mb-4">
                <div className="w-8 h-px bg-[#c9a84c]/50" />
                {t('Complete Payment', 'Selesaikan Pembayaran', lang)}
                <div className="w-8 h-px bg-[#c9a84c]/50" />
              </div>
              <h2 className="font-serif text-4xl font-bold text-[#f5f0e8] mb-2">
                {formatPrice(total)}
              </h2>
              <p className="text-[#888880]">
                {isQris
                  ? t('Scan the QR code to pay', 'Scan kode QR untuk membayar', lang)
                  : isCashier
                  ? t('Show this screen at the cashier', 'Tunjukkan layar ini ke kasir', lang)
                  : t('Open your e-wallet or card to pay', 'Buka dompet digital atau kartu Anda', lang)}
              </p>
            </div>

            {/* QR Code area */}
            <div className="bg-[#111] rounded-3xl border border-[rgba(201,168,76,0.15)] p-8 mb-6">
              {isQris ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <QRCode />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-lg bg-[#c9a84c] flex items-center justify-center">
                        <span className="font-serif text-[#0a0a0a] font-bold text-sm">K</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#888880] text-sm">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>
                      {t('Expires in', 'Kedaluwarsa dalam', lang)} <span className="text-amber-400 font-bold">{countdown}s</span>
                    </span>
                    <button
                      onClick={() => setCountdown(60)}
                      className="ml-2 text-[#c9a84c] hover:text-[#e8c96c]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : isCashier ? (
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="w-20 h-20 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                    <span className="text-4xl">🏦</span>
                  </div>
                  <div className="text-center">
                    <p className="text-[#f5f0e8] font-semibold mb-1">
                      {t('Order Submitted', 'Pesanan Dikirim', lang)}
                    </p>
                    <p className="text-[#888880] text-sm">
                      {t('Please proceed to the cashier counter to complete payment.', 'Silakan menuju kasir untuk menyelesaikan pembayaran.', lang)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 py-4">
                  <Smartphone className="w-16 h-16 text-[#c9a84c]" />
                  <p className="text-[#f5f0e8] text-center font-semibold">
                    {t('Open your app and scan or tap to pay', 'Buka aplikasi Anda dan scan atau tap untuk membayar', lang)}
                  </p>
                  <div className="flex gap-3 flex-wrap justify-center">
                    {['GoPay', 'OVO', 'Dana', 'ShopeePay'].map((w) => (
                      <span key={w} className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] text-[#888880] text-xs border border-[rgba(201,168,76,0.1)]">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Simulate pay button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSimulatePay}
              className="w-full bg-[#c9a84c] hover:bg-[#e8c96c] text-[#0a0a0a] font-bold py-4 rounded-2xl text-lg transition-colors shadow-[0_0_30px_rgba(201,168,76,0.3)]"
              style={{ minHeight: 64 }}
            >
              {isCashier
                ? t('Confirm at Cashier', 'Konfirmasi di Kasir', lang)
                : t('Simulate Payment Received', 'Simulasi Pembayaran Diterima', lang)}
            </motion.button>

            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'checkout' })}
              className="w-full text-center text-[#888880] hover:text-[#f5f0e8] text-sm mt-4 transition-colors"
            >
              {t('← Change payment method', '← Ganti metode pembayaran', lang)}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#c9a84c]/8 blur-[100px] pointer-events-none" />
    </div>
  )
}
