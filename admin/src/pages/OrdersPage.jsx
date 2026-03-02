import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Trash2, MapPin, Phone, User, Calendar,
  Clock, Truck, CheckCircle2, XCircle, ChevronDown, MessageSquare
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { useAdmin } from "../Context/AdminProvider";

// Status options with colors
const statusConfig = {
  Pending: { color: "text-orange-400", bg: "bg-orange-400/10", icon: <Clock size={16} /> },
  Processing: { color: "text-blue-400", bg: "bg-blue-400/10", icon: <Package size={16} /> },
  Shipped: { color: "text-purple-400", bg: "bg-purple-400/10", icon: <Truck size={16} /> },
  Delivered: { color: "text-green-400", bg: "bg-green-400/10", icon: <CheckCircle2 size={16} /> },
  Cancelled: { color: "text-red-400", bg: "bg-red-400/10", icon: <XCircle size={16} /> },
};

const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const {isLoading, orders, setOrders, baseURL} = useAdmin()

  // 3. Fixed Status Change: Instant UI Update + Enum Match
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`${baseURL}/order/${orderId}`, {
        orderStatus: newStatus
      });

      if (data.success) {
        // Instant update without reload
        setOrders((prevOrders) =>
          prevOrders.map((o) => {
            const id = o._id?.$oid || o._id;
            return id === orderId ? { ...o, orderStatus: newStatus } : o;
          })
        );
        toast.success(data.message || `Order is now ${newStatus}`);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;
    try {
      const { data } = await axios.delete(`${baseURL}/order/${orderId}`);
      if (data.success) {
        setOrders(orders.filter(o => {
          const id = o._id?.$oid || o._id;
          return id !== orderId;
        }));
        toast.success("Order deleted successfully");
      }else{
        toast.error(error.response?.data?.message || "Order Delete failed");
      }
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  // Filter orders based on active tab
  const filteredOrders = activeTab === "All" ? orders : orders.filter(o => o.orderStatus === activeTab);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-yellow-500">
            <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
            <p className="font-medium tracking-wide">Fetching Orders...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Orders Management</h1>
          <p className="text-gray-400 text-sm">Track and manage all customer purchases from your store.</p>
        </div>

        {/* Tabs for Filtering */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide border-b border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${activeTab === tab
                ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {tab}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeTab === tab ? "bg-black/20 text-black" : "bg-white/10 text-gray-300"}`}>
                {tab === "All" ? orders.length : orders.filter(o => o.orderStatus === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const conf = statusConfig[order.orderStatus] || statusConfig.Pending;

                // Handle MongoDB OID and Date objects gracefully based on your JSON structure
                const orderId = order._id?.$oid || order._id;
                const orderDate = new Date(order.createdAt?.$date || order.createdAt);

                // Calculate total items count accurately
                const totalItemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

                return (
                  <motion.div
                    key={orderId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col gap-6 hover:border-white/10 transition-colors"
                  >
                    {/* Top Row: Order ID, Date & Badge */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-white uppercase tracking-wider">#{orderId.slice(-8)}</h3>
                          <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">ID: {orderId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                          <Calendar size={14} />
                          {orderDate.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })} at {orderDate.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${conf.bg} ${conf.color} border border-current/10`}>
                        {conf.icon}
                        {order.orderStatus}
                      </div>
                    </div>

                    {/* Middle Row: Customer Info & Items */}
                    <div className="grid lg:grid-cols-2 gap-8">

                      {/* Customer Details */}
                      <div className="space-y-4 bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={14} /> Shipping Details
                        </h4>

                        <div className="space-y-3 mt-4">
                          <div className="flex items-center gap-3 text-sm text-gray-200">
                            <div className="bg-white/5 p-2 rounded-lg text-yellow-500"><User size={16} /></div>
                            <span className="font-medium text-base">{order.shippingDetails?.name || "N/A"}</span>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-300">
                            <div className="bg-white/5 p-2 rounded-lg text-yellow-500"><Phone size={16} /></div>
                            <span>{order.shippingDetails?.phone || "N/A"}</span>
                          </div>

                          <div className="flex items-start gap-3 text-sm text-gray-300">
                            <div className="bg-white/5 p-2 rounded-lg text-yellow-500 mt-1"><MapPin size={16} /></div>
                            <span className="leading-relaxed">
                              {order.shippingDetails?.address}<br />
                              <span className="text-gray-400">{order.shippingDetails?.city}</span>
                            </span>
                          </div>

                          {order.shippingDetails?.message && (
                            <div className="flex items-start gap-3 text-sm text-gray-300 mt-2 pt-3 border-t border-white/5">
                              <div className="text-gray-500 mt-0.5"><MessageSquare size={16} /></div>
                              <span className="italic text-gray-400">"{order.shippingDetails.message}"</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 flex flex-col">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 flex justify-between items-center">
                          <span>Products Ordered</span>
                          <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-semibold">
                            {totalItemsCount} {totalItemsCount > 1 ? 'Items' : 'Item'}
                          </span>
                        </h4>

                        <div className="space-y-3 flex-1 overflow-y-auto max-h-[220px] pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent rounded-lg">
                          {order.items.map((item, idx) => (
                            <div key={item._id + idx} className="flex gap-4 items-center bg-[#0a0a0a] p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                              {/* Product Thumbnail */}
                              <img
                                src={item.images?.[0] || "https://via.placeholder.com/80"}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-lg bg-[#121214] flex-shrink-0 border border-white/5"
                              />

                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">{item.title}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-[11px] font-bold text-black bg-yellow-400 px-2 py-0.5 rounded-md uppercase">
                                    Size: {item.selectedSize}
                                  </span>
                                  <span className="text-gray-400 text-xs font-medium bg-white/5 px-2 py-0.5 rounded-md">
                                    Qty: {item.quantity}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right flex-shrink-0">
                                <p className="text-yellow-400 font-bold text-sm">PKR {(item.price * item.quantity).toLocaleString()}</p>
                                <p className="text-gray-500 text-[10px] mt-1">PKR {item.price.toLocaleString()} each</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Total, Status Update & Delete */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                      <div className="text-lg bg-[#0a0a0a] px-5 py-3 rounded-xl border border-white/5 w-full sm:w-auto text-center sm:text-left">
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Bill</span>
                        <div className="text-2xl font-black text-yellow-500">PKR {order.totalPrice.toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Update Status Dropdown */}
                        <div className="relative flex-1 sm:flex-none">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(orderId, e.target.value)}
                            className="w-full sm:w-48 appearance-none bg-[#0a0a0a] border border-white/10 text-white pl-4 pr-10 py-3.5 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 cursor-pointer text-sm font-semibold transition-all hover:bg-white/5"
                          >
                            <option value="Pending">🕒 Pending</option>
                            <option value="Processing">📦 Processing</option>
                            <option value="Shipped">🚚 Shipped</option>
                            <option value="Delivered">✅ Delivered</option>
                            <option value="Cancelled">❌ Cancelled</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteOrder(orderId)}
                          className="p-3.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500"
                          title="Delete Order"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-[#121214] border border-white/5 rounded-2xl"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={32} className="text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No {activeTab !== "All" ? activeTab : ""} Orders Found
                </h3>
                <p className="text-gray-500">There are currently no orders in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;