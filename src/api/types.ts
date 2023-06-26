type TTransaction = {
  id: number
  name: string
  description: string
  categoryId: number
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
  selected?: boolean
}

type TItemPeriod = {
  [key: string]: number
}

type TCategories = {
  banks: TCategory[]
  income: TCategory[]
  costOfGoodsSold: TCategory[]
  expense: TCategory[]
}

type TReport = {
  categories: TCategories
  banksTotal: TPeriod[]
  grossProfit: TPeriod[]
  expenseTotal: TPeriod[]
  netIncome: TPeriod[]
}

export type {
  TTransaction,
  TCategory,
  TPeriod,
  TReport,
  TItemPeriod,
  TCategories,
}
