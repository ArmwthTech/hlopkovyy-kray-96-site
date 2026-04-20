'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, BriefcaseBusiness } from 'lucide-react'

interface Props {
  mode: 'b2b' | 'b2c'
  onToggle: (mode: 'b2b' | 'b2c') => void
}

export const ModeSwitcher: React.FC<Props> = ({ mode, onToggle }) => {
  return (
    <div className="relative flex p-1.5 glass rounded-full w-fit mx-auto shadow-lg items-center gap-1">
      <button
        onClick={() => onToggle('b2c')}
        className={`relative z-10 flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-colors ${
          mode === 'b2c' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <User size={18} />
        Для Дома
        {mode === 'b2c' && (
          <motion.div
            layoutId="switcher-active"
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full -z-10 shadow-lg shadow-pink-500/30"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>

      <button
        onClick={() => onToggle('b2b')}
        className={`relative z-10 flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-colors ${
          mode === 'b2b' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <BriefcaseBusiness size={18} />
        Для Бизнеса
        {mode === 'b2b' && (
          <motion.div
            layoutId="switcher-active"
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-lg shadow-blue-500/30"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    </div>
  )
}
