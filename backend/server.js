const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const driverRoutes = require('./src/routes/driver.routes');
const routeRoutes = require('./src/routes/route.routes');
const orderRoutes = require('./src/routes/order.routes');
const simulationRoutes = require('./src/routes/simulation.routes');

dotenv.config();

const app = express();

// --- START OF CORS CONFIGURATION ---
// Add all your possible frontend URLs here.
const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://purple-merit-fullstack-assessment.vercel.app', // Your main Vercel project URL
  // Add any other specific deployment preview URLs if you have them
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions));
// --- END OF CORS CONFIGURATION ---

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/simulate', simulationRoutes);

const PORT = process.env.PORT || 5001;

async function start() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL missing');
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');
  await connectDB(process.env.DATABASE_URL);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();