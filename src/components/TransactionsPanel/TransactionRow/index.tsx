import { Flex } from 'rebass'
import { Typography } from '@mui/material'
import { useDrag } from 'react-dnd'

import { TTransaction } from '../../../api/types.ts'
import {
  formatAmountToCurrency,
  formatDate,
  splitDateIntoMonthYear,
} from '../../../utils.ts'
import { StyledRow as Row } from './styles.ts'

type TTransactionRowProps = {
  transaction: TTransaction
}

const TransactionRow = ({ transaction }: TTransactionRowProps) => {
  const { id, name, description, amount, date } = transaction

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: splitDateIntoMonthYear(date),
      item: { transactionId: id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, 'cell']
  )

  return (
    <Row ref={drag} style={{ opacity }}>
      <Flex flexDirection="column">
        <Typography variant="body1" gutterBottom>
          {formatDate(date)}
        </Typography>
        <Typography variant="body1" gutterBottom fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
      </Flex>
      <Flex>
        <Typography variant="body1" fontWeight={600}>
          {formatAmountToCurrency(amount)}
        </Typography>
      </Flex>
    </Row>
  )
}

export default TransactionRow
