import { Router } from "express";
import Product from "../models/Product.js";
const router = Router();

router.get("/", async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category: { $regex: new RegExp(`^${category}$`, "i") } } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

router.get("/:id", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) return res.status(404).json({ error: "Not found" });
    res.json(prod);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const prod = await Product.create(req.body);
    res.status(201).json(prod);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const prod = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(prod);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router; 