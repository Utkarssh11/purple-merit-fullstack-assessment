import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import api from '../services/api'

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

function DashboardPage() {
  const [latest, setLatest] = useState(null)
  const [history, setHistory] = useState([])

  async function load() {
    const { data } = await api.get('/simulate/history')
    setHistory(data)
    if (data.length) setLatest(data[0])
  }

  useEffect(() => { load() }, [])

  const doughnutData = latest ? {
    labels: ['On-time', 'Late'],
    datasets: [{ data: [latest.onTimeDeliveries, latest.lateDeliveries], backgroundColor: ['#4caf50', '#f44336'] }]
  } : null

  const barData = latest ? {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Fuel Cost',
      data: [latest.fuelCostBreakdown?.High || 0, latest.fuelCostBreakdown?.Medium || 0, latest.fuelCostBreakdown?.Low || 0],
      backgroundColor: '#2196f3'
    }]
  } : null

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h2>Dashboard</h2>
      {latest && (
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div>Total Profit: ₹{latest.totalProfit?.toFixed(2)}</div>
          <div>Efficiency: {latest.efficiencyScore?.toFixed(2)}%</div>
          <div>Total Fuel Cost: ₹{latest.totalFuelCost?.toFixed(2)}</div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ width: 300 }}>{doughnutData && <Doughnut data={doughnutData} />}</div>
        <div style={{ width: 400 }}>{barData && <Bar data={barData} />}</div>
      </div>
      <div>
        <h3>Simulation History</h3>
        <div style={{ overflowX: 'auto' }}>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Total Profit</th>
                <th>Efficiency</th>
                <th>On-time</th>
                <th>Late</th>
                <th>Fuel Cost</th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h._id}>
                  <td>{new Date(h.timestamp).toLocaleString()}</td>
                  <td>₹{h.totalProfit?.toFixed(2)}</td>
                  <td>{h.efficiencyScore?.toFixed(2)}%</td>
                  <td>{h.onTimeDeliveries}</td>
                  <td>{h.lateDeliveries}</td>
                  <td>₹{h.totalFuelCost?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage


