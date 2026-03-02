import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import ProductRoute from "./routes/productRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import OrderRouter from "./routes/orderRouter.js";


// App Init
const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // frontend URL (change in production)
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


// Routes
app.use("/api/products", ProductRoute);
app.use("/api/order", OrderRouter);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    connectCloudinary()
    console.log("MongoDB Connected ✅");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong 💀"
  });
});
