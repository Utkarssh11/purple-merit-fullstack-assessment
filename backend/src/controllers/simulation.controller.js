const Driver = require('../models/driver.model')
const Route = require('../models/route.model')
const Order = require('../models/order.model')
const SimulationResult = require('../models/simulationResult.model')
const { simulateKpis } = require('../services/simulation.service')

async function runSimulation(req, res) {
  const { numberOfDrivers, maxHoursPerDriver } = req.body || {}
  if (typeof numberOfDrivers !== 'number' || typeof maxHoursPerDriver !== 'number') return res.status(400).json({ error: 'numberOfDrivers and maxHoursPerDriver required' })
  const drivers = await Driver.find().sort({ _id: 1 })
  const routes = await Route.find()
  const orders = await Order.find()
  const kpis = simulateKpis(drivers, routes, orders, numberOfDrivers, maxHoursPerDriver)
  const saved = await SimulationResult.create({
    totalProfit: kpis.totalProfit,
    efficiencyScore: kpis.efficiencyScore,
    onTimeDeliveries: kpis.onTimeVsLateData.onTime,
    lateDeliveries: kpis.onTimeVsLateData.late,
    totalFuelCost: kpis.totalFuelCost,
    simulationInputs: { drivers: numberOfDrivers, startTime: '', maxHours: maxHoursPerDriver }
  })
  res.json(kpis)
}

async function history(req, res) {
  const items = await SimulationResult.find().sort({ timestamp: -1 })
  res.json(items)
}

module.exports = { runSimulation, history }




