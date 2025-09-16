# Windward Assignment

This project is a full-stack application built for the Windward SE technical assignment.  
It includes a Node.js/Express API server and a React SPA client built with React, Vite, Material-UI, and Leaflet.

---

## Features

### Server (Node.js + Express)
- Loads vessel, fleet, and location data from JSON files in memory.  
- Exposes clean REST API routes:
  - `GET /api/fleets` → list of fleets with name and vessel count.  
  - `GET /api/fleets/:fleetId/vessels` → vessels of a specific fleet with metadata and location.  
  - `GET /api/vessels/search?name=&flag=&mmsi=&fleetId=` → search vessels with AND logic (by name, flag, MMSI, fleet).  
- No database required; all data stays in memory.  

### Client (React + Vite + Material-UI + Leaflet)
- **Home page** → shows a sortable table of fleets.  
- **Fleet page**:
  - Sortable table of vessels.  
  - Interactive map showing vessel positions with popups (flag, MMSI, type, last reported position).  
  - Search section (name, flag, MMSI) with AND filtering across fleet vessels.  

---

## Prerequisites
- [Node.js LTS](https://nodejs.org/) (20.x recommended)  
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
How to Start
Start the project from the project root:

bash
Copy code
cd windward-assignment
npm start
This command launches both the server and client together.

Server runs at: http://localhost:5001

Client runs at: http://localhost:5173

You can test the server with a health check endpoint:

bash
Copy code
http://localhost:5001/api/health
Expected response:

json
Copy code
{ "ok": true }
Usage
Open the client UI → http://localhost:5173
You will see a fleets table (sortable).

Click on a fleet row → you’ll be taken to the Fleet Page, which shows:

A table of vessels (sortable by any column).

A search bar (filter by name, flag, MMSI — with AND logic).

An interactive map with vessel positions and details in popups.

Use the search fields to filter vessels. Both the table and map update immediately.

Development Notes
If port 5001 is already in use, change it in server/src/index.js and update client/vite.config.js.

JSON data lives in server/data/.

Data is stored entirely in memory — no database setup required.

You can run server and client separately for debugging:

In one terminal:

bash
Copy code
cd server
npm run dev
In another terminal:

bash
Copy code
cd client
npm run dev
Author
David Daida
Technical Support Engineer Assignment

pgsql
Copy code

---
