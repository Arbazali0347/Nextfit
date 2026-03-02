import Orders from "../models/ordersModel.js";

// ✅ CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { items, shippingDetails, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.json({ message: "No order items" });
    }

    const order = await Orders.create({
      items,
      totalPrice,
      shippingDetails,
    });

    res.json({ success: true, message: "Order Submited Successfully!", order });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

// ✅ GET ALL ORDERS (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find().sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ GET SINGLE ORDER
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Orders.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.json({success: false, message: error.message });
  }
};

// ✅ DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();

    res.json({success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.json({success: false, message: error.message });
  }
};