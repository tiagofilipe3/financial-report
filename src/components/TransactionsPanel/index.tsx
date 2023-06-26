import {
  HeaderPeriod,
  HeaderTitle,
  HeaderTransactionCount,
  StyledHeader as Header,
  StyledPanel as Panel,
  StyledTextField as TextField,
} from './styles.ts'
import { TTransactionsPanelProps } from './types.ts'
import { Flex } from 'rebass'
import { formatMonth } from '../../utils.ts'
import { InputAdornment } from '@mui/material'
import search from '../../assets/search.png'
import TransactionsHeader from './TransactionsHeader'
import TransactionRow from './TransactionRow'
import closeImg from '../../assets/close.png'

const TransactionsPanel = ({
  isOpen,
  onClose,
  panelData,
}: TTransactionsPanelProps) => {
  if (!panelData) {
    return
  }

  const { transactions, categoryName, period } = panelData

  return (
    isOpen && (
      <Panel>
        <Header>
          <Flex alignItems="center" justifyContent="space-between">
            <HeaderTitle>{categoryName}</HeaderTitle>
            <img
              src={closeImg}
              alt="close"
              width={20}
              height={20}
              css={{ cursor: 'pointer' }}
              onClick={onClose}
            />
          </Flex>
          <Flex alignItems="center" mt="10px" justifyContent="space-between">
            <HeaderTransactionCount>
              {transactions.length} transactions
            </HeaderTransactionCount>
            <HeaderPeriod>{formatMonth(period, 'long')}</HeaderPeriod>
          </Flex>
          <TextField
            id="search"
            placeholder="Search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={search} width="18px" alt="search" />
                </InputAdornment>
              ),
            }}
            sx={{
              mt: '10px',
            }}
          />
        </Header>
        <Flex flexDirection="column">
          <TransactionsHeader
            period={formatMonth(period)}
            transactions={transactions}
          />
          {transactions &&
            transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
        </Flex>
      </Panel>
    )
  )
}

export default TransactionsPanel
