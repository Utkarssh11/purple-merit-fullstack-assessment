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

// --- START OF ENHANCED CORS CONFIGURATION ---
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from any vercel.app subdomain, localhost, and no origin (like Postman)
    if (!origin || origin.endsWith('.vercel.app') || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400
};

app.use(cors(corsOptions));

// Additional CORS headers for extra security
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
// --- END OF ENHANCED CORS CONFIGURATION ---

app.use(express.json());

// A simple health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Your other routes
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