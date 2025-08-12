import { useEffect, useState } from 'react'
import api from '../../services/api'

function DriversPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', shift_hours: 6, past_week_hours: '' })

  async function load() {
    const { data } = await api.get('/drivers')
    setItems(data)
  }

  useEffect(() => { load() }, [])

  async function create() {
    const payload = {
      name: form.name,
      shift_hours: Number(form.shift_hours),
      past_week_hours: String(form.past_week_hours).split('|').filter(Boolean).map(Number)
    }
    await api.post('/drivers', payload)
    setForm({ name: '', shift_hours: 6, past_week_hours: '' })
    await load()
  }

  async function remove(id) {
    await api.delete(`/drivers/${id}`)
    await load()
  }

  return (
    <div>
      <h2>Drivers</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="number" placeholder="Shift Hours" value={form.shift_hours} onChange={e => setForm({ ...form, shift_hours: e.target.value })} />
        <input placeholder="Past Week Hours 6|8|7" value={form.past_week_hours} onChange={e => setForm({ ...form, past_week_hours: e.target.value })} />
        <button onClick={create}>Add</button>
      </div>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Name</th>
            <th>Shift</th>
            <th>Past Week</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(d => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.shift_hours}</td>
              <td>{(d.past_week_hours || []).join('|')}</td>
              <td><button onClick={() => remove(d._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DriversPage




