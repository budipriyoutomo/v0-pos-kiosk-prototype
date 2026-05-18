'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { MenuItem, OrderItem } from './mock-data'

export type Screen =
  | 'welcome'
  | 'dine-type'
  | 'menu'
  | 'cart'
  | 'checkout'
  | 'payment'
  | 'success'
  | 'admin'

export type DineType = 'dine-in' | 'take-away' | null

export type Language = 'en' | 'id'

export type PaymentMethod = 'qris' | 'cashier' | 'ewallet' | 'debit' | null

interface KioskState {
  screen: Screen
  language: Language
  dineType: DineType
  cart: OrderItem[]
  promoCode: string
  promoDiscount: number
  paymentMethod: PaymentMethod
  orderNumber: string
  searchQuery: string
  activeCategory: string
}

type Action =
  | { type: 'SET_SCREEN'; screen: Screen }
  | { type: 'SET_LANGUAGE'; language: Language }
  | { type: 'SET_DINE_TYPE'; dineType: DineType }
  | { type: 'ADD_TO_CART'; item: OrderItem }
  | { type: 'UPDATE_CART_ITEM'; id: string; quantity: number }
  | { type: 'REMOVE_FROM_CART'; id: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_PROMO'; code: string; discount: number }
  | { type: 'SET_PAYMENT_METHOD'; method: PaymentMethod }
  | { type: 'SET_ORDER_NUMBER'; number: string }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'SET_CATEGORY'; category: string }

const initialState: KioskState = {
  screen: 'welcome',
  language: 'en',
  dineType: null,
  cart: [],
  promoCode: '',
  promoDiscount: 0,
  paymentMethod: null,
  orderNumber: '',
  searchQuery: '',
  activeCategory: 'all',
}

function kioskReducer(state: KioskState, action: Action): KioskState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen }
    case 'SET_LANGUAGE':
      return { ...state, language: action.language }
    case 'SET_DINE_TYPE':
      return { ...state, dineType: action.dineType }
    case 'ADD_TO_CART': {
      const existing = state.cart.find(
        (item) =>
          item.menuItem.id === action.item.menuItem.id &&
          item.size === action.item.size &&
          item.spicyLevel === action.item.spicyLevel
      )
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === existing.id
              ? { ...item, quantity: item.quantity + action.item.quantity, subtotal: (item.quantity + action.item.quantity) * item.menuItem.price }
              : item
          ),
        }
      }
      return { ...state, cart: [...state.cart, action.item] }
    }
    case 'UPDATE_CART_ITEM':
      if (action.quantity <= 0) {
        return { ...state, cart: state.cart.filter((item) => item.id !== action.id) }
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id
            ? { ...item, quantity: action.quantity, subtotal: action.quantity * item.menuItem.price }
            : item
        ),
      }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.id) }
    case 'CLEAR_CART':
      return { ...state, cart: [], promoCode: '', promoDiscount: 0, paymentMethod: null }
    case 'SET_PROMO':
      return { ...state, promoCode: action.code, promoDiscount: action.discount }
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.method }
    case 'SET_ORDER_NUMBER':
      return { ...state, orderNumber: action.number }
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query }
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.category }
    default:
      return state
  }
}

interface KioskContextType {
  state: KioskState
  dispatch: React.Dispatch<Action>
  subtotal: number
  tax: number
  serviceCharge: number
  total: number
  itemCount: number
}

const KioskContext = createContext<KioskContextType | null>(null)

export function KioskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(kioskReducer, initialState)

  const subtotal = state.cart.reduce((sum, item) => sum + item.subtotal, 0)
  const tax = Math.round(subtotal * 0.11)
  const serviceCharge = Math.round(subtotal * 0.05)
  const discount = state.promoDiscount
  const total = subtotal + tax + serviceCharge - discount
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <KioskContext.Provider value={{ state, dispatch, subtotal, tax, serviceCharge, total, itemCount }}>
      {children}
    </KioskContext.Provider>
  )
}

export function useKiosk() {
  const ctx = useContext(KioskContext)
  if (!ctx) throw new Error('useKiosk must be used within KioskProvider')
  return ctx
}

export const t = (en: string, id: string, lang: Language) => (lang === 'en' ? en : id)
