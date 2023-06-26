import { TableCell, TableRow } from '@mui/material'
import { Flex } from 'rebass'

import {
  CategoryDetailCell,
  TotalCell,
  ValueCell,
} from '../ReportTable/styles.ts'
import { TCategory, TPeriod } from '../../api/types.ts'
import { useState } from 'react'
import { StyledArrow as Arrow } from './styles.ts'
import { ListIcon } from './ListIcon'
import { formatAmount } from '../../utils.ts'
import Cell from './Cell'

type CollapsableProps = {
  title: string
  category: TCategory[] | undefined
  totals?: TPeriod[] | undefined
  headerLength?: number
  openTransactions: (categoryId: number, period: string) => void
  handleDrop: (item: { transactionId: number }, categoryId: number) => void
}

const Collapsable = ({
  title,
  totals,
  category,
  headerLength,
  openTransactions,
  handleDrop,
}: CollapsableProps) => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <>
      <TableRow>
        <TableCell onClick={handleShow}>
          <Flex alignItems="center">
            <Arrow src="/closedArrow.png" $show={show} />
            <ListIcon />
            <b>{title}</b>
          </Flex>
        </TableCell>
        {totals
          ? totals.map((period, index) => (
              <TotalCell key={index} align="right">
                {formatAmount(period.amount)}
              </TotalCell>
            ))
          : Array.from(Array(headerLength)).map((_, index) => (
              <ValueCell key={index}>&nbsp;</ValueCell>
            ))}
      </TableRow>
      {show &&
        category &&
        category.map(({ id, name, periods }) => (
          <TableRow key={id}>
            <CategoryDetailCell key={name}>
              <Flex alignItems="center">
                <ListIcon />
                {name}
              </Flex>
            </CategoryDetailCell>
            {periods?.map((period, index) => (
              <Cell
                categoryId={id}
                key={index}
                period={period}
                openTransactions={openTransactions}
                onDrop={handleDrop}
              />
            ))}
          </TableRow>
        ))}
    </>
  )
}

export { Collapsable }
