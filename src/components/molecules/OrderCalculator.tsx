'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Sparkles, Tag } from 'lucide-react'

interface Props {
  pricePerMeter: number
  minAmountForDiscount?: number
  discountPercent?: number
}

export const OrderCalculator: React.FC<Props> = ({
  pricePerMeter,
  minAmountForDiscount = 500,
  discountPercent = 10,
}) => {
  const [amount, setAmount] = useState<number | ''>(100)

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    if (isNaN(val) || val < 0) {
      setAmount('')
    } else {
      setAmount(val)
    }
  }

  const calculateTotal = () => {
    if (!amount || amount <= 0) return 0
    let total = amount * pricePerMeter
    if (amount >= minAmountForDiscount) {
      total = total - (total * discountPercent) / 100
    }
    return total
  }

  const total = calculateTotal()
  const isDiscounted = amount && amount >= minAmountForDiscount

  return (
    <div className="glass p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
      <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
        <Calculator size={300} />
      </div>
      
      <div>
        <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-3 text-slate-800">
          <div className="p-3 shadow-md bg-white rounded-xl text-blue-600">
            <Calculator size={24} />
          </div>
          Расчет стоимости
        </h3>
        
        <div className="space-y-3">
          <label htmlFor="amount" className="block font-medium text-slate-600">
            Оптовый метраж (погонные метры)
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              min="0"
              value={amount}
              onChange={handleAmountChange}
              className="w-full pl-6 pr-16 py-4 bg-white/70 border-2 border-slate-200/60 rounded-2xl text-xl font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="0"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-medium">метров</span>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <AnimatePresence>
          {isDiscounted && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-600 font-bold px-4 py-2 rounded-full text-sm border border-emerald-500/20"
            >
              <Tag size={16} /> Применена скидка {discountPercent}% от объема!
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end p-6 bg-slate-900 rounded-2xl shadow-xl shadow-slate-900/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 blur-3xl rounded-full" />
          <span className="text-slate-400 font-medium mb-2 sm:mb-0">Итоговая смета:</span>
          <motion.span 
            key={total}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-2"
            data-testid="total-price"
          >
            {total.toLocaleString('ru-RU')} ₽
            {isDiscounted ? <Sparkles size={28} className="text-emerald-400" /> : null}
          </motion.span>
        </div>
      </div>
    </div>
  )
}
