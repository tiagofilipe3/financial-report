// This logic mimics the back-end to get the full report,
// which gets all categories and sum the transactions of each category sorted by month
import { TCategory, TPeriod, TTransaction } from './types.ts'

const getReport = async () => {
  const transactions: TTransaction[] = await fetchData('transactions')

  const banks = await fetchDataWithTotal('banks', 'bankId', transactions)
  const incomes = await fetchDataWithTotal('income', 'incomeId', transactions)
  const costOfGoodsSold = await fetchDataWithTotal(
    'costOfGoodsSold',
    'costOfGoodsSoldId',
    transactions
  )
  const expense = await fetchDataWithTotal('expense', 'expenseId', transactions)

  return {
    banks,
    income: incomes,
    costOfGoodsSold,
    expense,
  }
}

const fetchDataWithTotal = async (
  endpoint: string,
  idField: string,
  transactions: TTransaction[]
) => {
  try {
    const data: TCategory[] = await fetchData(endpoint)

    return data.map((item) => {
      const itemTransactions = transactions.filter(
        (tr) => tr[idField as keyof typeof tr] === item.id
      )

      const itemPeriods: TPeriod = {}

      itemTransactions.forEach((tr) => {
        const monthYear = splitDateIntoMonthYear(tr.date)

        itemPeriods[monthYear] =
          itemPeriods[monthYear] !== undefined
            ? itemPeriods[monthYear] + tr.amount
            : tr.amount
      })

      return {
        ...item,
        periods: itemPeriods,
      }
    })
  } catch (e) {
    console.error(`Failed to fetch data from ${endpoint}: ${e}`)
    return []
  }
}
const fetchData = async (endpoint: string) => {
  const res = await fetch(`http://localhost:3001/${endpoint}`)
  return await res.json()
}

const splitDateIntoMonthYear = (date: string) => {
  const dateSplit = date.split('-')
  dateSplit.splice(1, 1)
  return dateSplit.join('-')
}

export { getReport }
