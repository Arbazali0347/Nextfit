import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: Array,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    shippingDetails: {
      type: Object,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Orders = mongoose.models.Order || mongoose.model("Orders", orderSchema);

export default Orders;