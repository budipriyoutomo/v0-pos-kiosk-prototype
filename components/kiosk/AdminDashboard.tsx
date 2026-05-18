'use client'

import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import { useKiosk } from '@/lib/kiosk-store'
import { mockAnalytics, mockOrders, formatPrice } from '@/lib/mock-data'
import { ArrowLeft, TrendingUp, ShoppingBag, Users, Clock, ChefHat } from 'lucide-react'

const statusColors: Record<string, string> = {
  preparing: 'text-amber-400 bg-amber-400/10',
  ready: 'text-emerald-400 bg-emerald-400/10',
  done: 'text-[#888880] bg-[#888880]/10',
}

function StatCard({
  label, value, sub, icon: Icon, color,
}: {
  label: string; value: string; sub: string; icon: React.ElementType; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111] rounded-2xl p-5 border border-[rgba(201,168,76,0.1)]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <TrendingUp className="w-4 h-4 text-emerald-400" />
      </div>
      <p className="text-[#888880] text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className="text-[#f5f0e8] text-2xl font-bold mb-1">{value}</p>
      <p className="text-[#888880] text-xs">{sub}</p>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-2.5">
        <p className="text-[#888880] text-xs mb-1">{label}:00</p>
        <p className="text-[#c9a84c] font-bold text-sm">{formatPrice(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export function AdminDashboard() {
  const { dispatch } = useKiosk()

  return (
    <div className="w-full h-full bg-[#0a0a0a] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-[rgba(201,168,76,0.1)] sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'welcome' })}
            className="flex items-center gap-2 text-[#888880] hover:text-[#c9a84c] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-[#c9a84c] text-xl font-bold">KUMO</span>
              <span className="text-[#888880] text-xs px-2 py-0.5 rounded-full border border-[rgba(201,168,76,0.2)]">Admin</span>
            </div>
            <p className="text-[#888880] text-xs">Today — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Today's Revenue"
            value={formatPrice(mockAnalytics.todaySales)}
            sub="+12% from yesterday"
            icon={TrendingUp}
            color="bg-[#c9a84c]/10 text-[#c9a84c]"
          />
          <StatCard
            label="Orders"
            value={String(mockAnalytics.todayOrders)}
            sub="Active orders: 3"
            icon={ShoppingBag}
            color="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            label="Avg. Order"
            value={formatPrice(mockAnalytics.avgOrderValue)}
            sub="+5% from yesterday"
            icon={Users}
            color="bg-purple-500/10 text-purple-400"
          />
          <StatCard
            label="Avg. Prep Time"
            value="14 min"
            sub="Target: 15 min"
            icon={Clock}
            color="bg-emerald-500/10 text-emerald-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue chart */}
          <div className="lg:col-span-2 bg-[#111] rounded-2xl p-6 border border-[rgba(201,168,76,0.1)]">
            <h3 className="text-[#f5f0e8] font-semibold mb-1">Hourly Revenue</h3>
            <p className="text-[#888880] text-xs mb-6">Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockAnalytics.hourlyData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fill: '#888880', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}:00`} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sales" stroke="#c9a84c" strokeWidth={2} fill="url(#goldGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Active orders */}
          <div className="bg-[#111] rounded-2xl p-6 border border-[rgba(201,168,76,0.1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#f5f0e8] font-semibold">Active Orders</h3>
              <ChefHat className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div className="space-y-3">
              {mockOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-xl">
                  <div>
                    <p className="text-[#f5f0e8] text-sm font-semibold">{order.id}</p>
                    <p className="text-[#888880] text-xs">{order.items} items · {order.table}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                      {order.status === 'preparing' ? `${order.time}` : order.status}
                    </span>
                    <p className="text-[#888880] text-xs mt-1">{formatPrice(order.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#111] rounded-2xl p-6 border border-[rgba(201,168,76,0.1)]">
            <h3 className="text-[#f5f0e8] font-semibold mb-4">Top Menu Items</h3>
            <div className="space-y-3">
              {mockAnalytics.topItems.map((item, i) => (
                <div key={item.name} className="flex items-center gap-4">
                  <span className="text-[#888880] text-xs w-5">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-[#f5f0e8] text-sm">{item.name}</span>
                      <span className="text-[#888880] text-xs">{item.orders} orders</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.orders / 42) * 100}%` }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                        className="h-full rounded-full bg-[#c9a84c]"
                      />
                    </div>
                  </div>
                  <span className="text-[#c9a84c] text-xs font-semibold w-20 text-right">{formatPrice(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by category */}
          <div className="bg-[#111] rounded-2xl p-6 border border-[rgba(201,168,76,0.1)]">
            <h3 className="text-[#f5f0e8] font-semibold mb-4">Revenue by Item</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockAnalytics.topItems} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#888880', fontSize: 9 }} axisLine={false} tickLine={false} angle={-15} textAnchor="end" />
                <YAxis hide />
                <Tooltip
                  formatter={(v: number) => formatPrice(v)}
                  contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, color: '#f5f0e8' }}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {mockAnalytics.topItems.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? '#c9a84c' : '#2a2a2a'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
