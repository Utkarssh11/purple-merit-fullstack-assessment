import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function SimulationPage() {
  const [numberOfDrivers, setNumberOfDrivers] = useState(5)
  const [maxHoursPerDriver, setMaxHoursPerDriver] = useState(8)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function run() {
    setLoading(true)
    setError('')
    try {
      await api.post('/simulate', { numberOfDrivers: Number(numberOfDrivers), maxHoursPerDriver: Number(maxHoursPerDriver) })
      navigate('/')
    } catch (e) {
      setError('Simulation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Run Simulation</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          Number of Drivers
          <input type="number" value={numberOfDrivers} onChange={e => setNumberOfDrivers(e.target.value)} />
        </label>
        <label>
          Max Hours Per Driver
          <input type="number" value={maxHoursPerDriver} onChange={e => setMaxHoursPerDriver(e.target.value)} />
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button onClick={run} disabled={loading}>{loading ? 'Running...' : 'Run Simulation'}</button>
      </div>
    </div>
  )
}

export default SimulationPage




