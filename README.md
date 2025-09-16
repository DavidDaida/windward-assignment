# Windward Assignment

This project is a full-stack application built for the Windward SE technical assignment.  
It includes a Node.js/Express API server and a React SPA client.

---

## Features

### Server (Node.js + Express)
- Loads vessel, fleet, and location data from JSON files in memory.  
- Routes:
  - `GET /api/fleets` → list of fleets with name and vessel count.  
  - `GET /api/fleets/:fleetId/vessels` → vessels of a specific fleet with metadata and location.  
  - `GET /api/vessels/search?name=&flag=&mmsi=&fleetId=` → search vessels (AND logic).  
- No database required; all data stays in memory.

### Client (React + Vite + Material-UI + Leaflet)
- Main page: sortable table of fleets.  
- Fleet page:
  - Sortable table of vessels.  
  - Map of vessel positions with popups.  
  - Search section (name, flag, MMSI) with AND filtering.  

---

## Prerequisites
- Node.js LTS (20.x recommended)  
- npm (comes with Node)  
- Git (for cloning/pushing)  
- VS Code (recommended editor)  

---

## Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/<your-username>/windward-assignment.git
cd windward-assignment

# install root dependency (concurrently)
npm install

# install server dependencies
cd server
npm install
cd ..

# install client dependencies
cd client
npm install
cd ..

## How to Start

From the project root (windward-assignment/):

npm start


This will start both server and client in parallel:

Server API → http://localhost:5001

Client UI → http://localhost:5173

Health check (server):
http://localhost:5001/api/health
 → returns { "ok": true }

Development Notes

If port 5001 is already in use, change it in server/src/index.js and update client/vite.config.js accordingly.

JSON data lives in server/data/.

Data is stored in memory — no database required.

Author

David Daida
Technical Support Engineer Assignment
