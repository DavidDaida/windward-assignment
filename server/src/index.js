import express from 'express';
import cors from 'cors';
import { loadAllData } from './dataLoader.js';

const app = express();
const PORT = process.env.PORT || 5001;
// Allow the React dev server to call our API during development
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Load data into memory once at startup
const { fleets, vesselById, locationByVesselId } = loadAllData();

// Utility: build fleet basic info
function fleetBasicInfo(fleet) {
  return {
    id: fleet._id,
    name: fleet.name,
    vesselCount: Array.isArray(fleet.vessels) ? fleet.vessels.length : 0
  };
}

// Utility: enrich a vessel with location and (optional) fleet value
function buildVesselDto(id, valueForFleet = null) {
  const vessel = vesselById.get(String(id));
  if (!vessel) return null;

  const loc = locationByVesselId.get(String(id)) || null;

  return {
    id: vessel._id,
    name: vessel.name || null,
    flag: vessel.flag || null,
    mmsi: vessel.mmsi || null,
    vessel_class: vessel.vessel_class || null,
    vessel_type: vessel.vessel_type || null,
    size: vessel.size ?? null,
    deadweight: vessel.deadweight ?? null,
    max_draught: vessel.max_draught ?? null,
    reported_port: vessel.reported_port || null,
    location: loc, // { lon, lat, ts, sog, course } or null
    value: valueForFleet // numeric or null
  };
}

/**
 * ROUTE 1: GET /api/fleets
 * Returns: [{ id, name, vesselCount }]
 */
app.get('/api/fleets', (req, res) => {
  const list = fleets.map(fleetBasicInfo);
  res.json(list);
});

/**
 * ROUTE 2: GET /api/fleets/:fleetId/vessels
 * Returns: list of enriched vessels in that fleet
 */
app.get('/api/fleets/:fleetId/vessels', (req, res) => {
  const { fleetId } = req.params;
  const fleet = fleets.find(f => String(f._id) === String(fleetId));
  if (!fleet) return res.status(404).json({ error: 'Fleet not found' });

  const result = [];
  for (const item of (fleet.vessels || [])) {
    const dto = buildVesselDto(item._id, item.value ?? null);
    if (dto) result.push(dto);
  }
  res.json(result);
});

/**
 * ROUTE 3: GET /api/vessels/search
 * Query params: name, flag, mmsi, fleetId (optional)
 * AND logic across provided fields (case-insensitive for name/flag).
 * If fleetId is given, restrict to that fleet's vessels.
 */
app.get('/api/vessels/search', (req, res) => {
  const { name, flag, mmsi, fleetId } = req.query;

  // Start with a set of candidate vessel IDs
  let candidateIds;

  if (fleetId) {
    const fleet = fleets.find(f => String(f._id) === String(fleetId));
    if (!fleet) return res.status(404).json({ error: 'Fleet not found' });
    candidateIds = new Set((fleet.vessels || []).map(v => String(v._id)));
  } else {
    // all vessels
    candidateIds = new Set(Array.from(vesselById.keys()));
  }

  const results = [];

  for (const id of candidateIds) {
    const v = vesselById.get(id);
    if (!v) continue;

    // AND logic: test only the filters provided
    let ok = true;

    if (name) {
      const hay = (v.name || '').toString().toLowerCase();
      const needle = name.toString().toLowerCase();
      if (!hay.includes(needle)) ok = false;
    }

    if (flag) {
      const hay = (v.flag || '').toString().toLowerCase();
      const needle = flag.toString().toLowerCase();
      if (hay !== needle) ok = false;
    }

    if (mmsi) {
      if (String(v.mmsi || '') !== String(mmsi)) ok = false;
    }

    if (ok) {
      results.push(buildVesselDto(id, null));
    }
  }

  res.json(results);
});

// Health check (optional)
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
