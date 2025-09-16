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

cd windward-assignment
---

## How to Start

Start the project from the **project root**:

```bash
cd windward-assignment
npm start

