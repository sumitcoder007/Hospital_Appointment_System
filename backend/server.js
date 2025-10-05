const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes.js');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173", // local frontend (Vite dev server)
  "https://hospital-system-001.netlify.app" // deployed Netlify frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// ✅ Error Handling
app.use(notFound);
app.use(errorHandler);

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
