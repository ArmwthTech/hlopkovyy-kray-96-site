import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SmartFilter } from '../components/molecules/SmartFilter'

describe('SmartFilter', () => {
  it('рендерит все поля фильтрации', () => {
    render(<SmartFilter />)
    expect(screen.getByLabelText(/Состав/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Плотность/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Ширина рулона/i)).toBeInTheDocument()
  })

  it('позволяет выбрать состав ткани', () => {
    render(<SmartFilter />)
    const select = screen.getByRole('combobox', { name: /Состав/i })
    fireEvent.change(select, { target: { value: 'cotton' } })
    expect(select).toHaveValue('cotton')
  })
})
