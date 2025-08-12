const Route = require('../models/route.model')

async function list(req, res) {
  const items = await Route.find()
  res.json(items)
}

async function get(req, res) {
  const item = await Route.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
}

async function create(req, res) {
  const { route_id, distance_km, traffic_level, base_time_min } = req.body
  if (
    route_id === undefined ||
    distance_km === undefined ||
    !traffic_level ||
    base_time_min === undefined
  ) return res.status(400).json({ error: 'Invalid payload' })
  const created = await Route.create({ route_id, distance_km, traffic_level, base_time_min })
  res.status(201).json(created)
}

async function update(req, res) {
  const updated = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json(updated)
}

async function remove(req, res) {
  const deleted = await Route.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
}

module.exports = { list, get, create, update, remove }




