type TMonthFormat =
  | 'short'
  | 'numeric'
  | '2-digit'
  | 'long'
  | 'narrow'
  | undefined

const formatAmount = (amount: number) => {
  return amount.toLocaleString('en-US')
}

const formatAmountToCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

const formatMonth = (date: string, monthFormat: TMonthFormat = 'short') => {
  const [month, year] = date.split('-')
  const monthName = new Date(month + '-01-01').toLocaleString('default', {
    month: monthFormat,
  })
  return `${monthName} ${year}`
}

const formatDate = (date: string) => {
  const [month, day, year] = date.split('-')
  const formattedMonth = month.length === 1 ? `0${month}` : month
  const formattedDay = day.length === 1 ? `0${day}` : day
  return `${formattedMonth}-${formattedDay}-${year}`
}

const splitDateIntoMonthYear = (date: string) => {
  const dateSplit = date.split('-')
  dateSplit.splice(1, 1)
  return dateSplit.join('-')
}

export {
  formatAmount,
  formatMonth,
  formatAmountToCurrency,
  formatDate,
  splitDateIntoMonthYear,
}
