'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useKiosk, t } from '@/lib/kiosk-store'
import { formatPrice } from '@/lib/mock-data'
import { ChevronLeft, QrCode, User, Wallet, CreditCard, ChevronRight } from 'lucide-react'

const paymentMethods = [
  {
    id: 'qris' as const,
    label: 'QRIS',
    labelId: 'QRIS',
    desc: 'Scan QR code',
    descId: 'Scan kode QR',
    icon: QrCode,
    popular: true,
  },
  {
    id: 'ewallet' as const,
    label: 'E-Wallet',
    labelId: 'Dompet Digital',
    desc: 'GoPay, OVO, Dana, ShopeePay',
    descId: 'GoPay, OVO, Dana, ShopeePay',
    icon: Wallet,
    popular: false,
  },
  {
    id: 'debit' as const,
    label: 'Debit / Credit Card',
    labelId: 'Kartu Debit / Kredit',
    desc: 'Visa, Mastercard, GPN',
    descId: 'Visa, Mastercard, GPN',
    icon: CreditCard,
    popular: false,
  },
  {
    id: 'cashier' as const,
    label: 'Pay at Cashier',
    labelId: 'Bayar di Kasir',
    desc: 'Cash or card at counter',
    descId: 'Tunai atau kartu di kasir',
    icon: User,
    popular: false,
  },
]

export function CheckoutScreen() {
  const { state, dispatch, subtotal, tax, serviceCharge, total } = useKiosk()
  const lang = state.language
  const [selected, setSelected] = useState<typeof state.paymentMethod>(null)

  const handlePay = () => {
    if (!selected) return
    dispatch({ type: 'SET_PAYMENT_METHOD', method: selected })
    dispatch({ type: 'SET_SCREEN', screen: 'payment' })
  }

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex overflow-hidden">
      {/* Left: order summary */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex items-center gap-4 px-8 py-6 border-b border-[rgba(201,168,76,0.1)]">
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'menu' })}
            className="flex items-center gap-2 text-[#888880] hover:text-[#c9a84c] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">{t('Back to Menu', 'Kembali ke Menu', lang)}</span>
          </button>
        </div>

        <div className="flex-1 px-8 py-6">
          <h2 className="font-serif text-3xl font-bold text-[#f5f0e8] mb-1">
            {t('Order Summary', 'Ringkasan Pesanan', lang)}
          </h2>
          <p className="text-[#888880] mb-8">
            {state.dineType === 'dine-in' ? t('Dine In', 'Makan di Sini', lang) : t('Take Away', 'Bawa Pulang', lang)}
          </p>

          <div className="space-y-3 mb-8">
            {state.cart.map((orderItem) => (
              <div key={orderItem.id} className="flex items-center gap-4 bg-[#111] rounded-2xl p-4 border border-[rgba(201,168,76,0.08)]">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={orderItem.menuItem.image} alt={orderItem.menuItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#f5f0e8] font-semibold text-sm line-clamp-1">{orderItem.menuItem.name}</p>
                  {orderItem.size && <p className="text-[#888880] text-xs">{orderItem.size}</p>}
                </div>
                <div className="text-right">
                  <p className="text-[#888880] text-xs">×{orderItem.quantity}</p>
                  <p className="text-[#c9a84c] font-bold text-sm">{formatPrice(orderItem.subtotal)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Totals breakdown */}
          <div className="bg-[#111] rounded-2xl p-5 border border-[rgba(201,168,76,0.1)] space-y-3">
            {[
              { label: t('Subtotal', 'Subtotal', lang), value: formatPrice(subtotal) },
              { label: t('Tax (11%)', 'Pajak (11%)', lang), value: formatPrice(tax) },
              { label: t('Service (5%)', 'Servis (5%)', lang), value: formatPrice(serviceCharge) },
              ...(state.promoDiscount > 0 ? [{ label: t('Discount', 'Diskon', lang), value: `-${formatPrice(state.promoDiscount)}`, gold: false, green: true }] : []),
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm text-[#888880]">
                <span>{row.label}</span>
                <span className={(row as { green?: boolean }).green ? 'text-emerald-400' : ''}>{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold pt-3 border-t border-[rgba(201,168,76,0.1)]">
              <span className="text-[#f5f0e8]">{t('Total', 'Total', lang)}</span>
              <span className="text-[#c9a84c] text-xl">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: payment selection */}
      <div className="w-96 flex-shrink-0 border-l border-[rgba(201,168,76,0.1)] flex flex-col bg-[#0d0d0d]">
        <div className="px-6 py-6 border-b border-[rgba(201,168,76,0.1)]">
          <h3 className="text-[#f5f0e8] font-bold text-xl">
            {t('Payment Method', 'Metode Pembayaran', lang)}
          </h3>
        </div>

        <div className="flex-1 px-6 py-4 space-y-3 overflow-y-auto">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            const isSelected = selected === method.id
            return (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                  isSelected
                    ? 'bg-[#c9a84c]/10 border-[#c9a84c]/50'
                    : 'bg-[#111] border-[rgba(201,168,76,0.1)] hover:border-[#c9a84c]/30'
                }`}
                style={{ minHeight: 72 }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-[#c9a84c]' : 'bg-[#1a1a1a]'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-[#0a0a0a]' : 'text-[#888880]'}`} />
                </div>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${isSelected ? 'text-[#c9a84c]' : 'text-[#f5f0e8]'}`}>
                    {lang === 'en' ? method.label : method.labelId}
                  </p>
                  <p className="text-[#888880] text-xs">
                    {lang === 'en' ? method.desc : method.descId}
                  </p>
                </div>
                {method.popular && (
                  <span className="text-[10px] bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30 px-2 py-0.5 rounded-full font-semibold">
                    Popular
                  </span>
                )}
                {isSelected && (
                  <div className="w-5 h-5 rounded-full border-2 border-[#c9a84c] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>

        <div className="px-6 py-5 border-t border-[rgba(201,168,76,0.1)]">
          <div className="flex justify-between text-sm text-[#888880] mb-4">
            <span>{t('Total to pay', 'Total pembayaran', lang)}</span>
            <span className="text-[#c9a84c] font-bold text-base">{formatPrice(total)}</span>
          </div>
          <motion.button
            whileHover={{ scale: selected ? 1.02 : 1 }}
            whileTap={{ scale: selected ? 0.98 : 1 }}
            onClick={handlePay}
            disabled={!selected}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${
              selected
                ? 'bg-[#c9a84c] hover:bg-[#e8c96c] text-[#0a0a0a] shadow-[0_0_30px_rgba(201,168,76,0.3)]'
                : 'bg-[#1a1a1a] text-[#888880] cursor-not-allowed'
            }`}
            style={{ minHeight: 56 }}
          >
            <span>{t('Confirm & Pay', 'Konfirmasi & Bayar', lang)}</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
