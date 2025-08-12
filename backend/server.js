const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from any vercel.app subdomain, localhost, and no origin (e.g., Postman)
    if (!origin || origin.endsWith('.vercel.app') || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));