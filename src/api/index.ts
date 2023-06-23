// This logic mimics the back-end to get the full report,
// which gets all categories and sum the transactions of each category sorted by month
import {
  TCategory,
  TItemPeriod,
  TPeriod,
  TReport,
  TTransaction,
} from './types.ts'

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
  const report = { banks, income: incomes, costOfGoodsSold, expense }
  const headers: string[] = findHeaders(report)

  return { report, headers }
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

      const itemPeriods: TItemPeriod = {}

      itemTransactions.forEach((tr) => {
        const monthYear = splitDateIntoMonthYear(tr.date)

        itemPeriods[monthYear] =
          itemPeriods[monthYear] !== undefined
            ? itemPeriods[monthYear] + tr.amount
            : tr.amount
      })

      // transform the object into an array
      // to make it easier to iterate over it in the front-end
      const periods: TPeriod[] = Object.keys(itemPeriods).map((key) => ({
        period: key,
        amount: itemPeriods[key],
      }))

      return { ...item, periods }
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

const findHeaders = (report: TReport): string[] => {
  const headers: Set<string> = new Set()

  Object.keys(report).forEach((key) => {
    report[key as keyof typeof report].forEach((item: TCategory) => {
      if (item.periods) {
        item.periods.map((period: TPeriod) => {
          headers.add(period.period)
        })
      }
    })
  })

  return Array.from(headers)
}

const splitDateIntoMonthYear = (date: string) => {
  const dateSplit = date.split('-')
  dateSplit.splice(1, 1)
  return dateSplit.join('-')
}

export { getReport }
