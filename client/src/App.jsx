import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import Fleets from './pages/Fleets.jsx'
import FleetPage from './pages/FleetPage.jsx'

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Windward Fleets
          </Typography>
          <Typography sx={{ ml: 2 }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Fleets />} />
          <Route path="/fleet/:fleetId" element={<FleetPage />} />
        </Routes>
      </Container>
    </>
  )
}
