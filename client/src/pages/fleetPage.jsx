// client/src/pages/FleetPage.jsx
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, TextField, Button, Stack, CircularProgress } from '@mui/material'
import SortableTable from '../components/SortableTable.jsx'
import MapView from '../components/MapView.jsx'
import { fetchFleetVessels, searchVessels } from '../api.js'

export default function FleetPage() {
  const { fleetId } = useParams()
  const [allVessels, setAllVessels] = React.useState(null)
  const [displayed, setDisplayed] = React.useState(null)
  const [error, setError] = React.useState('')

  // Search inputs
  const [name, setName] = React.useState('')
  const [flag, setFlag] = React.useState('')
  const [mmsi, setMmsi] = React.useState('')

  React.useEffect(() => {
    fetchFleetVessels(fleetId)
      .then(data => {
        setAllVessels(data)
        setDisplayed(data)
      })
      .catch(e => setError(e.message || 'Failed to load fleet vessels'))
  }, [fleetId])

  const handleSearch = async () => {
    try {
      const results = await searchVessels({
        name: name.trim() || undefined,
        flag: flag.trim() || undefined,
        mmsi: mmsi.trim() || undefined,
        fleetId
      })
      // Only show vessels that belong to this fleet
      setDisplayed(results)
    } catch (e) {
      setError(e.message || 'Search failed')
    }
  }

  const handleClear = () => {
    setName(''); setFlag(''); setMmsi('');
    setDisplayed(allVessels || [])
  }

  if (error) return <Typography color="error">{error}</Typography>
  if (!displayed) return <CircularProgress />

  const columns = [
    { id: 'name', label: 'Vessel Name' },
    { id: 'flag', label: 'Flag' },
    { id: 'mmsi', label: 'MMSI' },
    { id: 'vessel_class', label: 'Class' },
    { id: 'vessel_type', label: 'Type' },
    { id: 'value', label: 'Fleet Value' }
  ]

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Fleet {fleetId}</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} />
        <TextField label="Flag" value={flag} onChange={e => setFlag(e.target.value)} />
        <TextField label="MMSI" value={mmsi} onChange={e => setMmsi(e.target.value)} />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
        <Button variant="outlined" onClick={handleClear}>Clear</Button>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <SortableTable columns={columns} rows={displayed} />
      </Box>

      <Typography variant="h6" sx={{ mb: 1 }}>Map</Typography>
      <MapView vessels={displayed} />
    </Box>
  )
}
