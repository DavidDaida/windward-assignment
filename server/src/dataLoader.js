import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load a JSON file from server/data
function loadJson(fileName) {
  const p = path.join(__dirname, '..', 'data', fileName);
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw);
}

// Load data files into memory (called once at server start)
export function loadAllData() {
  const vessels = loadJson('vessels.json');               // array of vessel objects (has _id, name, flag, mmsi, etc.)
  const vesselLocations = loadJson('vesselLocations.json'); // array of { _id, lastpos: { geometry: { coordinates: [lon, lat] }, ... } }
  const fleets = loadJson('fleets.json');                 // array of fleets: { _id, name, vessels: [ { _id, value } ] }

  // Build fast lookup maps by _id
  const vesselById = new Map();
  for (const v of vessels) {
    if (v && v._id) {
      vesselById.set(String(v._id), v);
    }
  }

  const locationByVesselId = new Map();
  for (const loc of vesselLocations) {
    if (loc && loc._id && loc.lastpos && loc.lastpos.geometry && Array.isArray(loc.lastpos.geometry.coordinates)) {
      const [lon, lat] = loc.lastpos.geometry.coordinates;
      locationByVesselId.set(String(loc._id), {
        lon,
        lat,
        ts: loc.lastpos.ts || null,
        sog: loc.lastpos.sog ?? null,
        course: loc.lastpos.course ?? null
      });
    }
  }

  return {
    fleets,
    vesselById,
    locationByVesselId
  };
}
