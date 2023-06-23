import { useState, useEffect } from 'react'
import { getReport } from './api'
import { TReport } from './api/types.ts'
import { ReportTable } from './components/ReportTable/ReportTable.tsx'

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

  return <ReportTable report={report} headers={headers} />
}

export default App
