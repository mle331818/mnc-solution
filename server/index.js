import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://mle331818:fUHKho52UwPsmPwQ@mnc.u1irpbo.mongodb.net/?retryWrites=true&w=majority&appName=mnc";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

app.use("/api/products", productRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`)); 