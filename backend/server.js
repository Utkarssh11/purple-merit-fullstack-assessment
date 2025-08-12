const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectDB } = require('./src/config/db')
const authRoutes = require('./src/routes/auth.routes')
const driverRoutes = require('./src/routes/driver.routes')
const routeRoutes = require('./src/routes/route.routes')
const orderRoutes = require('./src/routes/order.routes')
const simulationRoutes = require('./src/routes/simulation.routes')

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/drivers', driverRoutes)
app.use('/api/routes', routeRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/simulate', simulationRoutes)

const PORT = process.env.PORT || 5001;

async function start() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL missing')
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing')
  await connectDB(process.env.DATABASE_URL)
  app.listen(PORT)
}

start()


