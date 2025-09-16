// client/src/pages/Fleets.jsx
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, CircularProgress } from '@mui/material'
import SortableTable from '../components/SortableTable.jsx'
import { fetchFleets } from '../api.js'

export default function Fleets() {
  const [rows, setRows] = React.useState(null)
  const [error, setError] = React.useState('')
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchFleets()
      .then(data => setRows(data))
      .catch(e => setError(e.message || 'Failed to load fleets'))
  }, [])

  if (error) return <Typography color="error">{error}</Typography>
  if (!rows) return <CircularProgress />

  const columns = [
    { id: 'name', label: 'Fleet Name' },
    { id: 'vesselCount', label: 'Vessels' }
  ]

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Fleets</Typography>
      <SortableTable
        columns={columns}
        rows={rows}
        onRowClick={(row) => navigate(`/fleet/${row.id}`)}
      />
    </>
  )
}
