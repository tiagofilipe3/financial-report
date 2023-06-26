import { NoBorderCell, NoValueCell } from '../styles.ts'
import { TableRow } from '@mui/material'

type TEmptyRowProps = {
  length: number
}

const EmptyRow = ({ length }: TEmptyRowProps) => {
  return (
    <TableRow>
      <NoBorderCell>&nbsp;</NoBorderCell>
      {Array.from(Array(length)).map((_, index) => (
        <NoValueCell key={index} align="right">
          &nbsp;
        </NoValueCell>
      ))}
    </TableRow>
  )
}

export { EmptyRow }
