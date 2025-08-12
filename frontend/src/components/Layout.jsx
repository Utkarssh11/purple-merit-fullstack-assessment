import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import SimulationPage from '../pages/SimulationPage'
import DriversPage from '../pages/management/DriversPage'
import OrdersPage from '../pages/management/OrdersPage'
import RoutesPage from '../pages/management/RoutesPage'

function Layout() {
  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Dashboard</Link>
        <Link to="/simulation">Simulation</Link>
        <Link to="/management/drivers">Drivers</Link>
        <Link to="/management/routes">Routes</Link>
        <Link to="/management/orders">Orders</Link>
        <button onClick={logout} style={{ marginLeft: 'auto' }}>Logout</button>
      </nav>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/management/drivers" element={<DriversPage />} />
          <Route path="/management/routes" element={<RoutesPage />} />
          <Route path="/management/orders" element={<OrdersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default Layout




