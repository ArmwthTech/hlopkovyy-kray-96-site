export interface SellerDetails {
  legalForm: string
  name: string
  inn: string
  ogrn: string
  legalAddress: string
  operatorEmail: string
  operatorPhone: string
}

export const SELLER_DETAILS: SellerDetails = {
  legalForm: 'Будет заполнено после уточнения формы владельца магазина',
  name: 'Будет заполнено после уточнения данных продавца',
  inn: 'Будет заполнено после уточнения ИНН',
  ogrn: 'Будет заполнено после уточнения ОГРН / ОГРНИП',
  legalAddress: 'Будет заполнено после уточнения адреса регистрации',
  operatorEmail: 'Будет заполнено после уточнения email оператора ПД',
  operatorPhone: 'Будет заполнено после уточнения телефона оператора ПД',
}

export const LEGAL_NOTICE =
  'Реквизиты продавца и оператора персональных данных временно не опубликованы, потому что владелец магазина ещё не передал подтверждённые регистрационные сведения. После получения данных страница будет обновлена без изменения структуры сайта.'
