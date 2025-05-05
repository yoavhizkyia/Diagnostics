import React, { useState } from 'react'

import './App.css'
import { Diagnostic } from './models/diagnostic'
import DiagnosticForm from './components/diagnosticsForm'
import DiagnosticTable from './components/diagnosticsTable'
import DiagnosticsGraph from './components/diagnosticsGraph'

const INIT_DIAGNOSTICS: Diagnostic[] = [
  { diagnosticId: "1", createdAt: new Date("2025-05-01T12:00:00Z"), type: 'motor', severity: "critical" },
  { diagnosticId: "5", createdAt: new Date("2025-05-02T12:00:00Z"), type: "gear", severity: "critical" },
  { diagnosticId: "2", createdAt: new Date("2025-05-02T12:00:00Z"), type: "gear", severity: "alarm" },
  { diagnosticId: "3", createdAt: new Date("2025-05-03T12:00:00Z"), type: "bearing", severity: "healthy" },
  { diagnosticId: "4", createdAt: new Date("2025-05-04T12:00:00Z"), type: "bearing", severity: "healthy" },
  { diagnosticId: "7", createdAt: new Date("2025-05-04T12:00:00Z"), type: "motor", severity: "alarm" },
  { diagnosticId: "6", createdAt: new Date("2025-05-05T12:00:00Z"), type: "bearing", severity: "healthy" },
  { diagnosticId: "8", createdAt: new Date("2025-05-05T12:00:00Z"), type: "bearing", severity: "critical" },
]

const App = () => {
  const [isDiagnosticFormOpen, setIsDiagnosticFormOpen] = useState(false)
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>(INIT_DIAGNOSTICS)

  return (
    <>
      <DiagnosticsGraph diagnostics={diagnostics} />
      <div className='table-header-container'>
        <h2>Diagnostics</h2>
        <button
          className="add-diagnostic-button"
          onClick={() => setIsDiagnosticFormOpen(true)}>
            + Add new
        </button>
      </div>
      <DiagnosticTable diagnostics={diagnostics} />
      {isDiagnosticFormOpen && (
        <div className='overlay'>
          <DiagnosticForm 
            setIsDiagnosticFormOpen={setIsDiagnosticFormOpen} 
            setDiagnostics={setDiagnostics} 
          />
        </div>
      )}
    </>
  )
}

export default App
