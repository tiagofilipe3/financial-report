import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'

import { getReport } from './api'
import { TReport } from './api/types'
import { ReportTable } from './components/ReportTable/ReportTable'
import { Flex } from 'rebass'
import branch from './assets/branch.png'
import settings from './assets/settings.png'
import {SettingsItem, StyledInput as Input, ToolbarItem} from "./styles.ts";

function App() {
  const [report, setReport] = useState<TReport | undefined>(undefined)
  const [headers, setHeaders] = useState<string[]>([])

  useEffect(() => {
    const fetchReport = async () => {
      const res = await getReport()
      setReport(res.report)
      setHeaders(res.headers)

      console.log(res.report)
    }

    fetchReport()
  }, [])

  return (
    <>
      <Flex alignItems="center">
        <ToolbarItem width="25%">
          <img src={branch} alt="hub" width="25px" height="25px" />
          <Typography ml="5px">Main</Typography>
        </ToolbarItem>
        <SettingsItem width="2%" alignItems="center" justifyContent="center">
          <img src={settings} alt="settings" width="25px" height="25px" />
        </SettingsItem>
        <ToolbarItem width="73%">
          <Input id="search" placeholder="Search" disableUnderline />
        </ToolbarItem>
      </Flex>
      <ReportTable report={report} headers={headers} />
    </>
  )
}

export default App
