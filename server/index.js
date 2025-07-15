import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://mnc-solution.vercel.app', 'https://mnc-solution.com']
    : ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:3000', 'http://127.0.0.1:8080', 'http://127.0.0.1:8081'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// API Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Something went wrong!", 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

// For Vercel serverless
export default app; 