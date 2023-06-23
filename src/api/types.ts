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
  periods?: TPeriod[]
}

type TPeriod = {
  period: string
  amount: number
}

type TItemPeriod = {
  [key: string]: number
}

type TReport = {
  banks: TCategory[]
  income: TCategory[]
  costOfGoodsSold: TCategory[]
  expense: TCategory[]
}

export type { TTransaction, TCategory, TPeriod, TReport, TItemPeriod }
