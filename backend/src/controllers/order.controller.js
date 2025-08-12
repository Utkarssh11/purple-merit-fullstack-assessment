const Order = require('../models/order.model')

async function list(req, res) {
  const items = await Order.find()
  res.json(items)
}

async function get(req, res) {
  const item = await Order.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
}

async function create(req, res) {
  const { order_id, value_rs, route_id, delivery_time_min, assigned_driver } = req.body
  if (
    order_id === undefined ||
    value_rs === undefined ||
    route_id === undefined ||
    delivery_time_min === undefined
  ) return res.status(400).json({ error: 'Invalid payload' })
  const created = await Order.create({ order_id, value_rs, route_id, delivery_time_min, assigned_driver })
  res.status(201).json(created)
}

async function update(req, res) {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json(updated)
}

async function remove(req, res) {
  const deleted = await Order.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
}

module.exports = { list, get, create, update, remove }


