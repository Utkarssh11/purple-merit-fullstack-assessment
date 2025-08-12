import { useEffect, useState } from 'react'
import api from '../../services/api'

function RoutesPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ route_id: '', distance_km: '', traffic_level: 'Low', base_time_min: '' })

  async function load() {
    const { data } = await api.get('/routes')
    setItems(data)
  }

  useEffect(() => { load() }, [])

  async function create() {
    const payload = {
      route_id: Number(form.route_id),
      distance_km: Number(form.distance_km),
      traffic_level: form.traffic_level,
      base_time_min: Number(form.base_time_min)
    }
    await api.post('/routes', payload)
    setForm({ route_id: '', distance_km: '', traffic_level: 'Low', base_time_min: '' })
    await load()
  }

  async function remove(id) {
    await api.delete(`/routes/${id}`)
    await load()
  }

  return (
    <div>
      <h2>Routes</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <input placeholder="Route ID" value={form.route_id} onChange={e => setForm({ ...form, route_id: e.target.value })} />
        <input placeholder="Distance (km)" value={form.distance_km} onChange={e => setForm({ ...form, distance_km: e.target.value })} />
        <select value={form.traffic_level} onChange={e => setForm({ ...form, traffic_level: e.target.value })}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input placeholder="Base Time (min)" value={form.base_time_min} onChange={e => setForm({ ...form, base_time_min: e.target.value })} />
        <button onClick={create}>Add</button>
      </div>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Route ID</th>
            <th>Distance</th>
            <th>Traffic</th>
            <th>Base Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(r => (
            <tr key={r._id}>
              <td>{r.route_id}</td>
              <td>{r.distance_km}</td>
              <td>{r.traffic_level}</td>
              <td>{r.base_time_min}</td>
              <td><button onClick={() => remove(r._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoutesPage


