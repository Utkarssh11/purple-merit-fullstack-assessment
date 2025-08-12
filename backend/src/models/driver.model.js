const mongoose = require('mongoose')

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  shift_hours: { type: Number, required: true },
  past_week_hours: { type: [Number], default: [] },
  isFatigued: { type: Boolean, default: false }
})

module.exports = mongoose.model('Driver', DriverSchema)


