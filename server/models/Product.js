import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    description: String,
    category: String,
    price: Number,
    stock: Number,
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema); 