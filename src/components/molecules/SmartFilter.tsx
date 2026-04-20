'use client'

import React, { useState } from 'react'
import { Filter, Ruler, PackageSearch, Pipette } from 'lucide-react'

export const SmartFilter = () => {
  const [filters, setFilters] = useState({
    density: '',
    composition: '',
    width: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="glass p-6 rounded-2xl flex flex-wrap gap-6 items-end relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/20 transition-all duration-500" />
      
      <div className="flex-1 min-w-[200px] space-y-2">
        <label htmlFor="comp-select" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Pipette size={16} className="text-blue-500" /> Состав
        </label>
        <select 
          id="comp-select"
          name="composition" 
          value={filters.composition}
          onChange={handleChange}
          className="w-full p-3 bg-white/50 border border-slate-200/60 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm transition-all"
        >
          <option value="">Все материалы</option>
          <option value="cotton">Хлопок 100%</option>
          <option value="satin">Сатин</option>
          <option value="polyester">Полиэстер / Смесь</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px] space-y-2">
        <label htmlFor="dens-select" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <PackageSearch size={16} className="text-blue-500" /> Плотность (г/м²)
        </label>
        <select 
          id="dens-select"
          name="density" 
          value={filters.density}
          onChange={handleChange}
          className="w-full p-3 bg-white/50 border border-slate-200/60 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm transition-all"
        >
          <option value="">Любая плотность</option>
          <option value="120">~120 - Постельное</option>
          <option value="140">~140 - Сатин</option>
          <option value="200">~200 - Декор / Покрывала</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px] space-y-2">
        <label htmlFor="width-input" className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Ruler size={16} className="text-blue-500" /> Ширина рулона (см)
        </label>
        <input 
          id="width-input"
          type="number"
          name="width"
          placeholder="Например, 220"
          value={filters.width}
          onChange={handleChange}
          className="w-full p-3 bg-white/50 border border-slate-200/60 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm transition-all"
        />
      </div>

      <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all flex items-center gap-2">
        <Filter size={18} /> Применить
      </button>
    </div>
  )
}
