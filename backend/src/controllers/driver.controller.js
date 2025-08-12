const Driver = require('../models/driver.model')

async function list(req, res) {
  const items = await Driver.find()
  res.json(items)
}

async function get(req, res) {
  const item = await Driver.findById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Not found' })
  res.json(item)
}

async function create(req, res) {
  const { name, shift_hours, past_week_hours, isFatigued } = req.body
  if (!name || shift_hours === undefined) return res.status(400).json({ error: 'Invalid payload' })
  const created = await Driver.create({ name, shift_hours, past_week_hours, isFatigued })
  res.status(201).json(created)
}

async function update(req, res) {
  const updated = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json(updated)
}

async function remove(req, res) {
  const deleted = await Driver.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'Not found' })
  res.json({ success: true })
}

module.exports = { list, get, create, update, remove }




