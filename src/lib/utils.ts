import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  if (price <= 0) {
    return 'По запросу'
  }

  return `${price.toLocaleString('ru-RU')} ₽`
}

export function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
