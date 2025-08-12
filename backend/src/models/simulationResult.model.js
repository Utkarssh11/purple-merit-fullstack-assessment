const mongoose = require('mongoose')

const SimulationResultSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  totalProfit: { type: Number },
  efficiencyScore: { type: Number },
  onTimeDeliveries: { type: Number },
  lateDeliveries: { type: Number },
  totalFuelCost: { type: Number },
  simulationInputs: {
    drivers: { type: Number },
    startTime: { type: String },
    maxHours: { type: Number }
  }
})

module.exports = mongoose.model('SimulationResult', SimulationResultSchema)


