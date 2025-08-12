import { useEffect, useState } from 'react'
import api from '../../services/api'

function OrdersPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ order_id: '', value_rs: '', route_id: '', delivery_time_min: '' })

  async function load() {
    const { data } = await api.get('/orders')
    setItems(data)
  }

  useEffect(() => { load() }, [])

  async function create() {
    const payload = {
      order_id: Number(form.order_id),
      value_rs: Number(form.value_rs),
      route_id: Number(form.route_id),
      delivery_time_min: Number(form.delivery_time_min)
    }
    await api.post('/orders', payload)
    setForm({ order_id: '', value_rs: '', route_id: '', delivery_time_min: '' })
    await load()
  }

  async function remove(id) {
    await api.delete(`/orders/${id}`)
    await load()
  }

  return (
    <div>
      <h2>Orders</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input placeholder="Order ID" value={form.order_id} onChange={e => setForm({ ...form, order_id: e.target.value })} />
        <input placeholder="Value (₹)" value={form.value_rs} onChange={e => setForm({ ...form, value_rs: e.target.value })} />
        <input placeholder="Route ID" value={form.route_id} onChange={e => setForm({ ...form, route_id: e.target.value })} />
        <input placeholder="Delivery Time (min)" value={form.delivery_time_min} onChange={e => setForm({ ...form, delivery_time_min: e.target.value })} />
        <button onClick={create}>Add</button>
      </div>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Value</th>
            <th>Route ID</th>
            <th>Delivery Time (min)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(o => (
            <tr key={o._id}>
              <td>{o.order_id}</td>
              <td>₹{o.value_rs}</td>
              <td>{o.route_id}</td>
              <td>{o.delivery_time_min}</td>
              <td><button onClick={() => remove(o._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersPage




