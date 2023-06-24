import { styled } from '@mui/system'
import { TableCell } from '@mui/material'

const ReportTitle = styled('h1')`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`

const CategoryDetailCell = styled(TableCell)({
  paddingLeft: '40px',
})

const ValueCell = styled(TableCell)({
  backgroundColor: 'rgba(229,229,229,0.3)',
  borderRight: '1px solid',
  borderRightColor: 'rgba(174,184,238,0.29)',
})

export { ReportTitle, CategoryDetailCell, ValueCell }
