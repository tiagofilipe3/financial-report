import { TReportTableProps } from './types.ts'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Flex } from 'rebass'
import { styled } from '@mui/system'

const StyledTableCell = styled(TableCell)({
  paddingLeft: '40px',
})

const ReportTable = ({ report, headers }: TReportTableProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key="report">Financial Report</TableCell>
            {headers.map((header, index) => (
              <TableCell key={index}>
                <Flex flexDirection="column">
                  <Flex>Actual</Flex>
                  {header}
                </Flex>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>Banks</b>
            </TableCell>
          </TableRow>
          {report?.banks.map(({ id, name, periods }) => (
            <TableRow key={id}>
              <StyledTableCell key={name}>{name}</StyledTableCell>
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
              <StyledTableCell key={name} sx={{ pl: '40px' }}>
                {name}
              </StyledTableCell>
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
              <StyledTableCell key={name}>{name}</StyledTableCell>
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
              <StyledTableCell key={name}>{name}</StyledTableCell>
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
