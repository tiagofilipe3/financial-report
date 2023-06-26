import { useCallback, useEffect, useState } from 'react'
import { Flex } from 'rebass'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { ReportTitle, ValueCell, HeaderCell } from './styles'
import { EmptyRow } from './EmptyRow/EmptyRow.tsx'
import { Collapsable } from '../Collapsable'
import { formatAmount, formatMonth } from '../../utils.ts'
import { ShortCellRow } from './ShortCell'
import {
  changeTransactionCategory,
  getReport,
  getTransactionsForCategoryAndPeriod,
} from '../../api'
import TransactionsPanel from '../TransactionsPanel'
import { TPanelData } from '../TransactionsPanel/types.ts'
import { TCategory, TReport } from '../../api/types.ts'
import { TCategoryAndPeriod } from './types.ts'
import ConfirmationDialog from './ConfirmationDialog'

const ReportTable = () => {
  const [report, setReport] = useState<TReport | undefined>(undefined)
  const [headers, setHeaders] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [panelData, setPanelData] = useState<TPanelData>()
  const [categoryAndPeriod, setCategoryAndPeriod] =
    useState<TCategoryAndPeriod>()
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [transactionAndCategoryId, setTransactionAndCategoryId] = useState<{
    transactionId: number
    categoryId: number
  }>()

  const { categories, banksTotal, grossProfit, expenseTotal, netIncome } =
    report || {}
  const { banks, income, costOfGoodsSold, expense } = categories || {}

  const findCategoryAndSelect = useCallback(
    (id: number, period: string) => {
      if (!banks || !income || !costOfGoodsSold || !expense) {
        return
      }

      const categoriesArr: TCategory[][] = [
        banks,
        income,
        costOfGoodsSold,
        expense,
      ]

      setCategoryToFalse(categoriesArr)

      categoriesArr.forEach((category) => {
        category.forEach((categoryItem) => {
          if (categoryItem.id === id) {
            categoryItem.periods?.forEach((categoryPeriod) => {
              if (categoryPeriod.period === period) {
                categoryPeriod.selected = true
              }
            })
          }
        })
      })
    },
    [banks, costOfGoodsSold, expense, income]
  )

  const fetchReport = async () => {
    const res = await getReport()
    setReport(res.report)
    setHeaders(res.headers)
  }

  const fetchPanelData = useCallback(async () => {
    const { categoryId, period } = categoryAndPeriod || {}

    console.log('Fetching')

    if (!categoryId || !period) {
      return
    }

    console.log('Really fetching')

    const data = await getTransactionsForCategoryAndPeriod(categoryId, period)

    setPanelData(data)
    findCategoryAndSelect(categoryId, period)
    setIsOpen(true)
  }, [categoryAndPeriod, findCategoryAndSelect])

  useEffect(() => {
    fetchReport()
  }, [])

  useEffect(() => {
    fetchPanelData()
  }, [fetchPanelData])

  const openTransactions = async (categoryId: number, period: string) => {
    setCategoryAndPeriod({ categoryId, period })
  }

  const setCategoryToFalse = (categoriesArr: TCategory[][]) => {
    categoriesArr.some((category) => {
      return category.some((categoryItem) => {
        if (categoryItem.periods) {
          categoryItem.periods.some((categoryPeriod) => {
            if (categoryPeriod.selected) {
              categoryPeriod.selected = false
              return true
            }
          })
        }
      })
    })
  }

  const handleClosePanel = () => {
    setIsOpen(false)
    setPanelData(undefined)

    if (!banks || !income || !costOfGoodsSold || !expense) {
      return
    }

    const categoriesArr: TCategory[][] = [
      banks,
      income,
      costOfGoodsSold,
      expense,
    ]

    setCategoryToFalse(categoriesArr)
  }

  const handleDrop = async (
    { transactionId }: { transactionId: number },
    categoryId: number
  ) => {
    setTransactionAndCategoryId({ transactionId, categoryId })
    setConfirmationDialogOpen(true)
  }

  const handleChangeTransactionCategory = async () => {
    const { transactionId, categoryId } = transactionAndCategoryId || {}

    setConfirmationDialogOpen(false)

    if (transactionId && categoryId) {
      await changeTransactionCategory(transactionId, categoryId)
      await fetchReport()
      await fetchPanelData()
    }
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell key="report">
                <ReportTitle>Financial Report</ReportTitle>
              </TableCell>
              {headers.map((header, index) => (
                <HeaderCell key={index}>
                  <Flex flexDirection="column" alignItems="flex-end">
                    <Flex>Actual</Flex>
                    <b>{formatMonth(header)}</b>
                  </Flex>
                </HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <Collapsable
              title="Banks"
              category={banks}
              totals={banksTotal}
              openTransactions={openTransactions}
              handleDrop={handleDrop}
            />
            <TableRow key="creditCards">
              <TableCell>
                <b>Credit cards</b>
              </TableCell>
              {Array.from(Array(headers.length)).map((_, index) => (
                <ValueCell key={index} align="right">
                  0
                </ValueCell>
              ))}
            </TableRow>
            <EmptyRow length={headers.length} />
            <ShortCellRow
              title="Available Starting Balance"
              data={banksTotal}
            />
            <EmptyRow length={headers.length} />
            <Collapsable
              title="Income"
              category={income}
              headerLength={headers.length}
              openTransactions={openTransactions}
              handleDrop={handleDrop}
            />
            <Collapsable
              title="Cost of Goods Sold"
              category={costOfGoodsSold}
              headerLength={headers.length}
              openTransactions={openTransactions}
              handleDrop={handleDrop}
            />
            <EmptyRow length={headers.length} />
            <ShortCellRow title="Gross Profit" data={grossProfit} />
            <EmptyRow length={headers.length} />
            <Collapsable
              title="Expenses"
              category={expense}
              headerLength={headers.length}
              openTransactions={openTransactions}
              handleDrop={handleDrop}
            />
            <TableRow>
              <TableCell>
                <i>
                  <b>Expense total</b>
                </i>
              </TableCell>
              {expenseTotal &&
                expenseTotal.map(({ amount }, index) => (
                  <ValueCell key={index} align="right">
                    <b>{formatAmount(amount)}</b>
                  </ValueCell>
                ))}
            </TableRow>
            <EmptyRow length={headers.length} />
            <ShortCellRow title="Net Income" data={netIncome} />
          </TableBody>
        </Table>
      </TableContainer>
      <TransactionsPanel
        isOpen={isOpen}
        panelData={panelData}
        onClose={handleClosePanel}
      />
      <ConfirmationDialog
        open={confirmationDialogOpen}
        handleOk={handleChangeTransactionCategory}
        handleCancel={() => setConfirmationDialogOpen(false)}
      />
    </>
  )
}

export { ReportTable }
