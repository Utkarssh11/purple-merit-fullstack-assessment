const { simulateKpis, isDriverFatigued } = require('./simulation.service')

test('fatigue detection when any day > 8', () => {
  expect(isDriverFatigued([8, 8, 9, 8, 8, 8, 8])).toBe(true)
  expect(isDriverFatigued([8, 8, 8, 8])).toBe(false)
})

test('fuel cost calc with traffic surcharge', () => {
  const drivers = [{ _id: 'd1', past_week_hours: [8, 8, 8] }]
  const routes = [{ route_id: 1, distance_km: 10, traffic_level: 'High', base_time_min: 30 }]
  const orders = [{ route_id: 1, value_rs: 100, delivery_time_min: 30 }]
  const k = simulateKpis(drivers, routes, orders, 1, 8)
  expect(k.totalFuelCost).toBe(70)
  expect(k.fuelCostBreakdown.High).toBe(70)
})

test('late penalty applied', () => {
  const drivers = [{ _id: 'd1', past_week_hours: [8, 8, 8] }]
  const routes = [{ route_id: 1, distance_km: 1, traffic_level: 'Low', base_time_min: 10 }]
  const orders = [{ route_id: 1, value_rs: 100, delivery_time_min: 25 }]
  const k = simulateKpis(drivers, routes, orders, 1, 8)
  expect(k.onTimeVsLateData.late).toBe(1)
  expect(k.totalProfit).toBeCloseTo(100 - 5 - 50)
})

test('high-value bonus on-time', () => {
  const drivers = [{ _id: 'd1', past_week_hours: [8, 8, 8] }]
  const routes = [{ route_id: 1, distance_km: 2, traffic_level: 'Low', base_time_min: 30 }]
  const orders = [{ route_id: 1, value_rs: 2000, delivery_time_min: 35 }]
  const k = simulateKpis(drivers, routes, orders, 1, 8)
  expect(k.onTimeVsLateData.onTime).toBe(1)
  expect(k.totalProfit).toBeCloseTo(2000 + 200 - 10)
})

test('fatigued driver increases base time by 30%', () => {
  const drivers = [{ _id: 'd1', past_week_hours: [9, 9, 9] }]
  const routes = [{ route_id: 1, distance_km: 2, traffic_level: 'Low', base_time_min: 100 }]
  const orders = [{ route_id: 1, value_rs: 100, delivery_time_min: 121 }]
  const k = simulateKpis(drivers, routes, orders, 1, 8)
  expect(k.onTimeVsLateData.onTime).toBe(1)
})


