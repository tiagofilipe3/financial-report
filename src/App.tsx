import { Typography } from '@mui/material'

import { ReportTable } from './components/ReportTable/ReportTable'
import { Flex } from 'rebass'
import branch from './assets/branch.png'
import settings from './assets/settings.png'
import { SettingsItem, StyledInput as Input, ToolbarItem } from './styles.ts'

function App() {
  return (
    <>
      <Flex alignItems="center">
        <ToolbarItem width="22%">
          <img src={branch} alt="hub" width="25px" height="25px" />
          <Typography ml="5px">Main</Typography>
        </ToolbarItem>
        <SettingsItem width="2%" alignItems="center" justifyContent="center">
          <img src={settings} alt="settings" width="25px" height="25px" />
        </SettingsItem>
        <ToolbarItem width="76%">
          <Input id="search" placeholder="Search" disableUnderline />
        </ToolbarItem>
      </Flex>
      <ReportTable />
    </>
  )
}

export default App
