'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useKiosk } from '@/lib/kiosk-store'
import { WelcomeScreen } from './WelcomeScreen'
import { DineTypeScreen } from './DineTypeScreen'
import { MenuScreen } from './MenuScreen'
import { CheckoutScreen } from './CheckoutScreen'
import { PaymentScreen } from './PaymentScreen'
import { SuccessScreen } from './SuccessScreen'
import { AdminDashboard } from './AdminDashboard'

const pageVariants = {
  initial: { opacity: 0, y: 16, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.99 },
}

const transition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }

export function KioskApp() {
  const { state } = useKiosk()

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0a] relative">
      <AnimatePresence mode="wait">
        {state.screen === 'welcome' && (
          <motion.div key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="absolute inset-0">
            <WelcomeScreen />
          </motion.div>
        )}
        {state.screen === 'dine-type' && (
          <motion.div key="dine-type" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="absolute inset-0">
            <DineTypeScreen />
          </motion.div>
        )}
        {state.screen === 'menu' && (
          <motion.div key="menu" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="absolute inset-0">
            <MenuScreen />
          </motion.div>
        )}
        {state.screen === 'checkout' && (
          <motion.div key="checkout" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="absolute inset-0">
            <CheckoutScreen />
          </motion.div>
        )}
        {state.screen === 'payment' && (
          <motion.div key="payment" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="absolute inset-0">
            <PaymentScreen />
          </motion.div>
        )}
        {state.screen === 'success' && (
          <motion.div key="success" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="absolute inset-0">
            <SuccessScreen />
          </motion.div>
        )}
        {state.screen === 'admin' && (
          <motion.div key="admin" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={transition} className="absolute inset-0">
            <AdminDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
