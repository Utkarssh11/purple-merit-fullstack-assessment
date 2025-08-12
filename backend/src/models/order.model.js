const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  value_rs: { type: Number, required: true },
  route_id: { type: Number, required: true },
  delivery_time_min: { type: Number, required: true },
  assigned_driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }
})

module.exports = mongoose.model('Order', OrderSchema)




