GreenCart Logistics Dashboard

## Project Overview

Internal tool for GreenCart Logistics to simulate delivery operations and compute KPIs under custom company rules. Managers can tweak staffing and constraints, run simulations, and view KPIs and history on a dashboard.

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Jest
- Frontend: React (Vite), React Router, Axios, Chart.js with react-chartjs-2

## Monorepo Structure

```text
/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── data/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
└── README.md
```

## Getting Started

### Backend

1. Install dependencies

```bash
npm --prefix backend install
```

2. Create `backend/.env`

```ini
DATABASE_URL=
JWT_SECRET=
PORT=5001
FRONTEND_URL=http://localhost:5173
```

3. Seed database

```bash
npm --prefix backend run seed
```

4. Start the API

```bash
npm --prefix backend run dev
```

### Frontend

1. Install dependencies

```bash
npm --prefix frontend install
```

2. Create `frontend/.env`

```ini
VITE_API_URL=http://localhost:5001/api
```

3. Start the web app

```bash
npm --prefix frontend run dev
```

4. Create a manager user and log in

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Use the token in the UI or with the APIs below.

## Environment Variables

### Backend `.env`

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT` (default 5001)
- `FRONTEND_URL`

### Frontend `.env`

- `VITE_API_URL` (e.g., `http://localhost:5001/api`)

## API Documentation

Base URL: `http://localhost:5001/api`

### Auth

- POST `/auth/register`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

- POST `/auth/login`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "token": "<jwt>"
}
```

Attach the token as `Authorization: Bearer <jwt>` for protected routes.

### Drivers

- GET `/drivers`
- GET `/drivers/:id`
- POST `/drivers`
- PUT `/drivers/:id`
- DELETE `/drivers/:id`

Example create:

```json
{
  "name": "Amit",
  "shift_hours": 6,
  "past_week_hours": [6,8,7,7,7,6,10]
}
```

### Routes

- GET `/routes`
- GET `/routes/:id`
- POST `/routes`
- PUT `/routes/:id`
- DELETE `/routes/:id`

Example create:

```json
{
  "route_id": 11,
  "distance_km": 12,
  "traffic_level": "Medium",
  "base_time_min": 50
}
```

### Orders

- GET `/orders`
- GET `/orders/:id`
- POST `/orders`
- PUT `/orders/:id`
- DELETE `/orders/:id`

Example create:

```json
{
  "order_id": 100,
  "value_rs": 1500,
  "route_id": 4,
  "delivery_time_min": 72
}
```

### Simulation

- POST `/simulate`

Request body:

```json
{
  "numberOfDrivers": 5,
  "maxHoursPerDriver": 8
}
```

Response:

```json
{
  "totalProfit": 12345.67,
  "efficiencyScore": 82.5,
  "fuelCostBreakdown": { "High": 1000, "Medium": 500, "Low": 300 },
  "onTimeVsLateData": { "onTime": 40, "late": 10 },
  "totalFuelCost": 1800
}
```

- GET `/simulate/history`

Returns a list of past runs including KPIs and inputs.

## Testing

Run backend unit tests for the simulation logic:

```bash
npm --prefix backend test
```

## Deployment

### Backend

Deploy to a Node hosting provider. Configure environment variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `FRONTEND_URL`

Set the start command to `npm start` in the backend.

### Frontend

Deploy to a static hosting provider. Configure `VITE_API_URL` to the deployed backend API base URL.

### Database

Use MongoDB Atlas and set the connection string in `DATABASE_URL`.



