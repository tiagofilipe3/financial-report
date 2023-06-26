import { styled } from '@mui/system'
import { TableCell } from '@mui/material'

type TValueCell = {
  selected?: boolean
  isActive?: boolean
}

const ReportTitle = styled('h1')`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`

const CategoryDetailCell = styled(TableCell)({
  paddingLeft: '40px',
})

const ValueCell = styled(TableCell, {
  shouldForwardProp: (propName) => propName !== 'isActive',
})<TValueCell>(({ selected, isActive }) => ({
  backgroundColor: selected
    ? 'rgba(255, 191, 0, 0.1)'
    : 'rgb(215 215 215 / 30%)',
  borderRight: '1.5px solid rgba(174,184,238,0.29)',
  border: isActive
    ? '2px dashed rgba(255, 191, 0, 0.5)'
    : selected
    ? '2px solid rgba(255, 191, 0, 0.5)'
    : '',
}))

const TallCell = styled(ValueCell)({
  height: '50px',
})

const TotalCell = styled(TallCell)({
  fontWeight: 'bold',
})

const HeaderCell = styled(ValueCell)({
  paddingTop: '10px',
  paddingBottom: '10px',
})

const ShortCell = styled(TableCell)({
  backgroundColor: '#f7fafc',
  height: '30px',
  paddingBottom: 0,
  paddingTop: 0,
  borderBottom: 0,
})

const ShortValueCell = styled(ShortCell)({
  backgroundColor: '#f7fafc',
  height: '30px',
  paddingBottom: 0,
  paddingTop: 0,
  borderBottom: 0,
  borderRight: '1.5px solid rgba(174,184,238,0.29)',
  fontWeight: 'bold',
})

const NoValueCell = styled(ValueCell)({
  borderBottom: 'none',
})

const NoBorderCell = styled(TableCell)({
  border: 'none',
})
export {
  ReportTitle,
  CategoryDetailCell,
  ValueCell,
  TallCell,
  HeaderCell,
  TotalCell,
  ShortCell,
  ShortValueCell,
  NoValueCell,
  NoBorderCell,
}
