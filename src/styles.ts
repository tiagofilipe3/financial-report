import styled, {createGlobalStyle} from "styled-components";
import { Flex } from "rebass";
import {Input} from "@mui/material";

const ToolbarItem = styled(Flex)`
  padding: 8px;
  border-right: 1px solid rgba(174,184,238,0.29);
  border-bottom: 1px solid rgba(174,184,238,0.29);
`

const SettingsItem = styled(ToolbarItem)`
  width: 55px;
  padding: 8px 12px;
`

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const StyledInput = styled(Input)`
  border-bottom: 0;
`

export { ToolbarItem, SettingsItem, GlobalStyle, StyledInput }