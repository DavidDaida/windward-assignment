import * as React from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

// Center at Indian Ocean-ish; will auto-fit later if you want
const DEFAULT_CENTER = [7.0, 80.0]
const DEFAULT_ZOOM = 4

export default function MapView({ vessels }) {
  // vessels: [{ name, flag, mmsi, location: { lat, lon, ts }, ... }]

  return (
    <div style={{ height: 420, width: '100%' }}>
      <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          // OpenStreetMap tiles (free)
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {vessels.filter(v => v?.location?.lat && v?.location?.lon).map((v, i) => (
          <Marker position={[v.location.lat, v.location.lon]} key={i}>
            <Popup>
              <div style={{ minWidth: 200 }}>
                <strong>{v.name || 'Unknown vessel'}</strong><br />
                Flag: {v.flag || 'N/A'}<br />
                MMSI: {v.mmsi || 'N/A'}<br />
                Class: {v.vessel_class || 'N/A'}<br />
                Type: {v.vessel_type || 'N/A'}<br />
                Pos. Time: {v.location.ts || 'N/A'}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
