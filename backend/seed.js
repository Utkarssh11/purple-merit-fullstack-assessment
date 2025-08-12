const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const Driver = require('./src/models/driver.model')
const Route = require('./src/models/route.model')
const Order = require('./src/models/order.model')

async function connect() {
  const uri = process.env.DATABASE_URL
  if (!uri) throw new Error('DATABASE_URL missing')
  await mongoose.connect(uri)
}

function parseCSV(content) {
  const lines = content.trim().split(/\r?\n/)
  const header = lines.shift().split(',')
  return lines.filter(Boolean).map(line => {
    const cols = line.split(',')
    const obj = {}
    header.forEach((h, i) => (obj[h] = cols[i]))
    return obj
  })
}

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

async function seed() {
  await connect()

  await Promise.all([
    Driver.deleteMany({}),
    Route.deleteMany({}),
    Order.deleteMany({})
  ])

  const driversCsv = fs.readFileSync(path.join(__dirname, 'data', 'drivers.csv'), 'utf8')
  const routesCsv = fs.readFileSync(path.join(__dirname, 'data', 'routes.csv'), 'utf8')
  const ordersCsv = fs.readFileSync(path.join(__dirname, 'data', 'orders.csv'), 'utf8')

  const drivers = parseCSV(driversCsv).map(d => ({
    name: d.name,
    shift_hours: Number(d.shift_hours),
    past_week_hours: d.past_week_hours.split('|').map(Number)
  }))

  const routes = parseCSV(routesCsv).map(r => ({
    route_id: Number(r.route_id),
    distance_km: Number(r.distance_km),
    traffic_level: r.traffic_level,
    base_time_min: Number(r.base_time_min)
  }))

  const orders = parseCSV(ordersCsv).map(o => ({
    order_id: Number(o.order_id),
    value_rs: Number(o.value_rs),
    route_id: Number(o.route_id),
    delivery_time_min: timeToMinutes(o.delivery_time)
  }))

  await Driver.insertMany(drivers)
  await Route.insertMany(routes)
  await Order.insertMany(orders)

  await mongoose.disconnect()
}

seed().catch(async e => {
  console.error(e)
  try { await mongoose.disconnect() } catch {}
  process.exit(1)
})


