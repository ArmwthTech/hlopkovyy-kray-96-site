import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { OrderCalculator } from '../components/molecules/OrderCalculator'

describe('OrderCalculator (B2B)', () => {
  it('рендерит базовый интерфейс калькулятора', () => {
    render(<OrderCalculator pricePerMeter={500} />)
    expect(screen.getByText(/Расчет стоимости/i)).toBeInTheDocument()
  })

  it('корректно рассчитывает стоимость для 100 метров', () => {
    render(<OrderCalculator pricePerMeter={500} />)
    const input = screen.getByLabelText(/Оптовый метраж/i)
    fireEvent.change(input, { target: { value: '100' } })
    
    // 100 * 500 = 50 000
    expect(screen.getByTestId('total-price')).toHaveTextContent('50 000')
  })

  it('игнорирует отрицательные значения (Edge Case)', () => {
    render(<OrderCalculator pricePerMeter={500} />)
    const input = screen.getByLabelText(/Оптовый метраж/i)
    fireEvent.change(input, { target: { value: '-50' } })
    
    // Должно вернуть 0 или сбросить на мин. значение
    expect(screen.getByTestId('total-price')).toHaveTextContent('0')
  })

  it('применяет скидку при заказе свыше 500 метров', () => {
    render(<OrderCalculator pricePerMeter={500} minAmountForDiscount={500} discountPercent={10} />)
    const input = screen.getByLabelText(/Оптовый метраж/i)
    fireEvent.change(input, { target: { value: '1000' } })
    
    // 1000 * 500 = 500 000 - 10% = 450 000
    expect(screen.getByTestId('total-price')).toHaveTextContent('450 000')
  })
})
