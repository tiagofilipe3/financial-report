import { TTransaction } from '../../api/types.ts'

type TPanelData = {
  transactions: TTransaction[]
  categoryName: string
  period: string
}

type TTransactionsPanelProps = {
  isOpen: boolean
  panelData: TPanelData | undefined
  onClose: () => void
}

export type { TPanelData, TTransactionsPanelProps }
