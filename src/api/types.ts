type TTransaction = {
  id: number
  name: string
  description: string
  categoryId: number
  bankId?: number
  creditCardId?: number
  incomeId?: number
  costOfGoodsSoldId?: number
  expenseId?: number
  date: string
  amount: number
}

type TCategory = {
  id: number
  name: string
}

type TPeriod = {
  [key: string]: number
}

export type { TTransaction, TCategory, TPeriod }
