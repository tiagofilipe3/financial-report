import styled from 'styled-components'
import { TextField } from '@mui/material'

const StyledPanel = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  background-color: #fff;
  border-left: 1px solid rgba(224, 224, 224, 1);
  font-family: sans-serif;
`

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #627491;
  padding: 20px 30px;
`

const HeaderTitle = styled.div`
  color: #fff;
  font-size: 26px;
`

const HeaderTransactionCount = styled.div`
  color: #ffc300;
  font-size: 16px;
`

const HeaderPeriod = styled.div`
  color: #c3c3c3;
  font-size: 16px;
`

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
  },
})

export {
  StyledPanel,
  StyledHeader,
  HeaderTitle,
  HeaderTransactionCount,
  HeaderPeriod,
  StyledTextField,
}
