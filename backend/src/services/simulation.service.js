function isDriverFatigued(pastWeekHours) {
  return pastWeekHours.some(h => h > 8)
}

function simulateKpis(drivers, routes, orders, numberOfDrivers, maxHoursPerDriver) {
  const selectedDrivers = drivers.slice(0, Math.max(0, numberOfDrivers))
  const fatiguedById = new Map()
  selectedDrivers.forEach(d => fatiguedById.set(String(d._id || d.name), isDriverFatigued(d.past_week_hours || [])))
  const routeById = new Map(routes.map(r => [Number(r.route_id), r]))
  let totalProfit = 0
  let onTime = 0
  let late = 0
  let totalFuelCost = 0
  const fuelCostByTraffic = { High: 0, Medium: 0, Low: 0 }
  const driverIds = selectedDrivers.map(d => String(d._id || d.name))
  let driverIndex = 0
  const n = driverIds.length || 1
  orders.forEach(o => {
    const assignedDriverId = driverIds[driverIndex % n]
    driverIndex++
    const route = routeById.get(Number(o.route_id))
    if (!route) return
    const isFatigued = fatiguedById.get(assignedDriverId) || false
    const adjustedBase = isFatigued ? route.base_time_min * 1.3 : route.base_time_min
    const isLate = Number(o.delivery_time_min) > adjustedBase + 10
    const baseFuel = Number(route.distance_km) * 5
    const surcharge = route.traffic_level === 'High' ? Number(route.distance_km) * 2 : 0
    const fuelCost = baseFuel + surcharge
    totalFuelCost += fuelCost
    if (fuelCostByTraffic[route.traffic_level] !== undefined) fuelCostByTraffic[route.traffic_level] += fuelCost
    const penalty = isLate ? 50 : 0
    const bonus = Number(o.value_rs) > 1000 && !isLate ? Number(o.value_rs) * 0.1 : 0
    const profit = Number(o.value_rs) + bonus - penalty - fuelCost
    totalProfit += profit
    if (isLate) late++
    else onTime++
  })
  const total = onTime + late
  const efficiencyScore = total === 0 ? 0 : (onTime / total) * 100
  return {
    totalProfit,
    efficiencyScore,
    fuelCostBreakdown: fuelCostByTraffic,
    onTimeVsLateData: { onTime, late },
    totalFuelCost
  }
}

module.exports = { simulateKpis, isDriverFatigued }


