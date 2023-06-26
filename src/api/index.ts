// This logic mimics a back-end to get the full report,
// which gets all categories and sum the transactions of each category sorted by month
import {
  TCategories,
  TCategory,
  TItemPeriod,
  TPeriod,
  TTransaction,
} from './types.ts'
import { splitDateIntoMonthYear } from '../utils.ts'

const getReport = async () => {
  const transactions: TTransaction[] = await fetchData('transactions')

  const banks = await fetchDataWithTotal('categories?type=1', transactions)
  const banksTotal: TPeriod[] = findTotal(banks)

  const income = await fetchDataWithTotal('categories?type=3', transactions)
  const costOfGoodsSold = await fetchDataWithTotal(
    'categories?type=4',
    transactions
  )

  const expense = await fetchDataWithTotal('categories?type=5', transactions)
  const expenseTotal = findTotal(expense)

  const grossProfit = findGrossProfit(income, costOfGoodsSold)
  const netIncome = findNetIncome(grossProfit, expense)

  const report = {
    categories: {
      banks,
      income,
      costOfGoodsSold,
      expense,
    },
    banksTotal,
    expenseTotal,
    grossProfit,
    netIncome,
  }
  const headers: string[] = findHeaders(report.categories)

  return { report, headers }
}

const getTransactionsForCategoryAndPeriod = async (
  categoryId: number,
  period: string
) => {
  const [month, year] = period.split('-')
  const firstDay = new Date(+year, +month - 1, 1)
  const lastDay = new Date(+year, +month, 0)

  const firstDayString = `${
    firstDay.getMonth() + 1
  }-${firstDay.getDate()}-${firstDay.getFullYear()}`
  const lastDayString = `${
    lastDay.getMonth() + 1
  }-${lastDay.getDate()}-${lastDay.getFullYear()}`

  const transactions = await fetchData(
    `transactions?categoryId=${categoryId}&date_gte=${firstDayString}&date_lte=${lastDayString}`
  )

  const category = await fetchData(`categories/${categoryId}`)

  return {
    transactions,
    categoryName: category.name,
    period,
  }
}

const fetchDataWithTotal = async (
  endpoint: string,
  transactions: TTransaction[]
) => {
  try {
    const data: TCategory[] = await fetchData(endpoint)

    return data.map((item) => {
      const itemTransactions = transactions.filter(
        (tr) => tr.categoryId === item.id
      )

      const itemPeriods: TItemPeriod = {}

      itemTransactions.forEach((tr) => {
        const monthYear = splitDateIntoMonthYear(tr.date)

        //truncate to two decimals
        const truncatedAmount = +tr.amount.toFixed(2)

        itemPeriods[monthYear] =
          itemPeriods[monthYear] !== undefined
            ? +(itemPeriods[monthYear] + truncatedAmount).toFixed(2)
            : truncatedAmount
      })

      // Transform the object into an array
      // to make it easier to iterate over it in the front-end
      const periods: TPeriod[] = Object.keys(itemPeriods).map((key) => ({
        period: key,
        amount: itemPeriods[key],
      }))

      periods.sort(function (a, b) {
        const [monthA, yearA] = a.period.split('-')
        const [monthB, yearB] = b.period.split('-')

        if (yearA === yearB) {
          return parseInt(monthA) - parseInt(monthB)
        } else {
          return parseInt(yearA) - parseInt(yearB)
        }
      })

      return { ...item, periods }
    })
  } catch (e) {
    console.error(`Failed to fetch data from ${endpoint}: ${e}`)
    return []
  }
}

const changeTransactionCategory = async (
  transactionId: number,
  categoryId: number
) => {
  await fetch(`http://localhost:3001/transactions/${transactionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ categoryId }),
  })
}

const fetchData = async (endpoint: string) => {
  const res = await fetch(`http://localhost:3001/${endpoint}`)
  return await res.json()
}

const findGrossProfit = (income: TCategory[], costOfGoodsSold: TCategory[]) => {
  const incomeTotal: TPeriod[] = []
  income.forEach((income) => {
    income.periods?.forEach((period) => {
      const index = incomeTotal.findIndex(
        (item) => item.period === period.period
      )
      if (index === -1) {
        incomeTotal.push({ ...period })
      } else {
        incomeTotal[index].amount += period.amount
      }
    })
  })

  const costOfGoodsSoldTotal: TPeriod[] = []
  costOfGoodsSold.forEach((costOfGoodsSold) => {
    costOfGoodsSold.periods?.forEach((period) => {
      const index = costOfGoodsSoldTotal.findIndex(
        (item) => item.period === period.period
      )
      if (index === -1) {
        costOfGoodsSoldTotal.push({ ...period })
      } else {
        costOfGoodsSoldTotal[index].amount += period.amount
      }
    })
  })

  const grossProfit: TPeriod[] = []
  incomeTotal.forEach((income) => {
    const costOfGoodsSoldPeriod = costOfGoodsSoldTotal.find(
      (item) => item.period === income.period
    )
    if (costOfGoodsSoldPeriod) {
      grossProfit.push({
        period: income.period,
        amount: income.amount - costOfGoodsSoldPeriod.amount,
      })
    }
  })

  return grossProfit
}

const findNetIncome = (grossProfit: TPeriod[], expense: TCategory[]) => {
  const expenseTotal: TPeriod[] = []
  expense.forEach((expense) => {
    expense.periods?.forEach((period) => {
      const index = expenseTotal.findIndex(
        (item) => item.period === period.period
      )
      if (index === -1) {
        expenseTotal.push({ ...period })
      } else {
        expenseTotal[index].amount += period.amount
      }
    })
  })

  const netIncome: TPeriod[] = []
  grossProfit.forEach((grossProfit) => {
    const expensePeriod = expenseTotal.find(
      (item) => item.period === grossProfit.period
    )
    if (expensePeriod) {
      netIncome.push({
        period: grossProfit.period,
        amount: grossProfit.amount - expensePeriod.amount,
      })
    }
  })

  return netIncome
}

const findTotal = (categories: TCategory[]) => {
  const total: TPeriod[] = []
  categories.forEach((category) => {
    category.periods?.forEach((period) => {
      const index = total.findIndex((item) => item.period === period.period)
      if (index === -1) {
        total.push({ ...period })
      } else {
        total[index].amount += period.amount
      }
    })
  })

  return total
}

const findHeaders = (categories: TCategories): string[] => {
  const headers: Set<string> = new Set()

  Object.keys(categories).forEach((key) => {
    categories[key as keyof typeof categories].forEach((item: TCategory) => {
      if (item.periods) {
        item.periods.map((period: TPeriod) => {
          headers.add(period.period)
        })
      }
    })
  })

  return sortDatesAscending(Array.from(headers))
}

function sortDatesAscending(dates: string[]) {
  dates.sort(function (a, b) {
    const [monthA, yearA] = a.split('-')
    const [monthB, yearB] = b.split('-')

    if (yearA === yearB) {
      return parseInt(monthA) - parseInt(monthB)
    } else {
      return parseInt(yearA) - parseInt(yearB)
    }
  })

  return dates
}

export {
  getReport,
  getTransactionsForCategoryAndPeriod,
  changeTransactionCategory,
}
