import { StyledContainer as Container } from './styles.ts'
import { Flex } from 'rebass'
import { TTransaction } from '../../../api/types.ts'
import { formatAmountToCurrency } from '../../../utils.ts'

type TTransactionsHeaderProps = {
  period: string
  transactions: TTransaction[]
}

const TransactionsHeader = ({
  period,
  transactions,
}: TTransactionsHeaderProps) => {
  const total = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  )

  return (
    <Container>
      <Flex>{period}</Flex>
      <Flex>{formatAmountToCurrency(total)}</Flex>
    </Container>
  )
}

export default TransactionsHeader
