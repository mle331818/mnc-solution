import mongoose from "mongoose";

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Connect to MongoDB if not connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(mongoUri);
    }

    res.status(200).json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      status: "ERROR", 
      message: error.message,
      mongodb: "disconnected"
    });
  }
} 