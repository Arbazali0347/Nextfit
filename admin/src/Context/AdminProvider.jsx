import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_API;

  // Fetch Orders
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // 🚀 Yahan apna real API call lagayein:
      const { data } = await axios.get(`${baseURL}/order`);
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };


  // ✅ Get Products
  const getProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/products/get-products`);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error("Get Products Error:", error);
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    try {
      const res = await axios.post(`${baseURL}/products/delete-product`, { id });

      if (res.data.success) {
        // UI se bhi remove karo
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted ✅");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Delete failed ❌");
    }
  };

  // auto load
  useEffect(() => {
    getProducts();
    fetchOrders();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        products,
        getProducts,
        deleteProduct,
        baseURL,
        orders,
        isLoading,
        setOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// custom hook 🔥
export const useAdmin = () => useContext(AdminContext);
