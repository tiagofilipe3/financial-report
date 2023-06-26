import { ShortCell, ShortValueCell } from '../styles.ts'
import { formatAmount } from '../../../utils.ts'
import { TableRow } from '@mui/material'
import { TPeriod } from '../../../api/types.ts'

type TShortCellProps = {
  title: string
  data?: TPeriod[]
}

const ShortCellRow = ({ title, data }: TShortCellProps) => (
  <TableRow>
    <ShortCell>
      <b>{title}</b>
    </ShortCell>
    {data &&
      data.map(({ amount }, index) => (
        <ShortValueCell key={index} align="right">
          {formatAmount(amount)}
        </ShortValueCell>
      ))}
  </TableRow>
)

export { ShortCellRow }
