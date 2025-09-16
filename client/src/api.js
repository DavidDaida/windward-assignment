import axios from 'axios';

// Axios will call /api/* which vite proxies to http://localhost:5001
export const api = axios.create({
  baseURL: '/api'
});

export async function fetchFleets() {
  const { data } = await api.get('/fleets');
  return data;
}

export async function fetchFleetVessels(fleetId) {
  const { data } = await api.get(`/fleets/${fleetId}/vessels`);
  return data;
}

// Search with AND logic; fleetId optional but recommended for fleet page
export async function searchVessels({ name, flag, mmsi, fleetId }) {
  const params = {};
  if (name) params.name = name;
  if (flag) params.flag = flag;
  if (mmsi) params.mmsi = mmsi;
  if (fleetId) params.fleetId = fleetId;

  const { data } = await api.get('/vessels/search', { params });
  return data;
}
