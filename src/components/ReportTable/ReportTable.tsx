import { Flex } from 'rebass'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { TReportTableProps } from './types.ts'
import { CategoryDetailCell, ReportTitle, ValueCell } from './styles'

const ReportTable = ({ report, headers }: TReportTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key="report">
              <ReportTitle>Financial Report</ReportTitle>
            </TableCell>
            {headers.map((header, index) => (
              <ValueCell key={index}>
                <Flex flexDirection="column" alignItems="flex-end">
                  <Flex>Actual</Flex>
                  <b>{header}</b>
                </Flex>
              </ValueCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>Banks</b>
            </TableCell>
            {Array.from(Array(headers.length)).map((_, index) => (
              <TableCell key={index}>&nbsp;</TableCell>
            ))}
          </TableRow>
          {report?.banks.map(({ id, name, periods }) => (
            <TableRow key={id}>
              <CategoryDetailCell key={name}>{name}</CategoryDetailCell>
              {periods?.map(({ amount }, index) => (
                <TableCell key={index}>
                  <Flex flexDirection="column">{amount}</Flex>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow key="creditCards">
            <TableCell>
              <b>Credit cards</b>
              {/* TODO: Add empty array positions for categories with no value on periods */}
            </TableCell>
          </TableRow>
          <TableRow key="startingBalance">
            <TableCell>
              <b>Available Starting Balance</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Income</b>
            </TableCell>
          </TableRow>
          {report?.income.map(({ id, name, periods }) => (
            <TableRow key={id}>
              <CategoryDetailCell key={name} sx={{ pl: '40px' }}>
                {name}
              </CategoryDetailCell>
              {periods?.map(({ amount }, index) => (
                <TableCell key={index}>
                  <Flex flexDirection="column">{amount}</Flex>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <b>Cost of Goods Sold</b>
            </TableCell>
          </TableRow>
          {report?.costOfGoodsSold.map(({ id, name, periods }) => (
            <TableRow key={id}>
              <CategoryDetailCell key={name}>{name}</CategoryDetailCell>
              {periods?.map(({ amount }, index) => (
                <TableCell key={index}>
                  <Flex flexDirection="column">{amount}</Flex>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <b>Expenses</b>
            </TableCell>
          </TableRow>
          {report?.expense.map(({ id, name, periods }) => (
            <TableRow key={id}>
              <CategoryDetailCell key={name}>{name}</CategoryDetailCell>
              {periods?.map(({ amount }, index) => (
                <TableCell key={index}>
                  <Flex flexDirection="column">{amount}</Flex>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <i>
                <b>Expense total</b>
              </i>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ReportTable }
