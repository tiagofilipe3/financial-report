import { useState, useEffect } from 'react'
import { Input, Typography } from '@mui/material'

import { getReport } from './api'
import { TReport } from './api/types'
import { ReportTable } from './components/ReportTable/ReportTable'
import { Flex } from 'rebass'
import branch from '../../assets/branch.png'
import settings from '../../assets/settings.png'

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
      <Flex>
        <img src={branch} alt="hub" width="25px" height="25px" />
        <Typography ml="5px">Main</Typography>
      </Flex>
      <Flex alignItems="center">
        <img src={settings} alt="settings" width="20px" height="20px" />
      </Flex>
      <Input id="search" placeholder="Search" />
      <ReportTable report={report} headers={headers} />
    </>
  )
}

export default App
