import styled, { createGlobalStyle } from 'styled-components'
import { Flex } from 'rebass'
import { Input } from '@mui/material'

const ToolbarItem = styled(Flex)`
  display: flex;
  align-items: center;
  padding: 8px;
  height: 48px;
  border-right: 1px solid rgba(174, 184, 238, 0.29);
  border-bottom: 1px solid rgba(174, 184, 238, 0.29);
`

const SettingsItem = styled(ToolbarItem)`
  cursor: pointer;
  width: 55px;
  height: 48px;
  padding: 8px 12px;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    color: #212427;
  }
`

const StyledInput = styled(Input)`
  border-bottom: 0;
`

export { ToolbarItem, SettingsItem, GlobalStyle, StyledInput }
