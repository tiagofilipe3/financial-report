import { Flex } from 'rebass'
import { useDrop } from 'react-dnd'

import { formatAmount } from '../../../utils.ts'
import { ValueCell } from '../../ReportTable/styles.ts'
import { TPeriod } from '../../../api/types.ts'

type TCell = {
  openTransactions: (categoryId: number, period: string) => void
  categoryId: number
  period: TPeriod
  onDrop: (item: { transactionId: number }, categoryId: number) => void
}

const Cell = ({
  openTransactions,
  categoryId,
  period: { period, amount, selected },
  onDrop,
}: TCell) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: period,
    drop: (item: { transactionId: number }) => onDrop(item, categoryId),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop

  return (
    <ValueCell ref={drop} align="right" selected={selected} isActive={isActive}>
      <Flex
        flexDirection="column"
        onClick={() => openTransactions(categoryId, period)}
      >
        {formatAmount(amount)}
      </Flex>
    </ValueCell>
  )
}

export default Cell
