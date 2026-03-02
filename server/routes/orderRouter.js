import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.post("/", createOrder);
OrderRouter.get("/", getAllOrders);
OrderRouter.get("/:id", getSingleOrder);
OrderRouter.put("/:id", updateOrderStatus);
OrderRouter.delete("/:id", deleteOrder);

export default OrderRouter;