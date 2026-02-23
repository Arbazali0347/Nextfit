import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const baseURL = "http://localhost:5000/api/products";

  // ✅ Get Products
  const getProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/get-products`);
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
      const res = await axios.post(`${baseURL}/delete-product`, { id });

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
  }, []);

  return (
    <AdminContext.Provider
      value={{
        products,
        getProducts,
        deleteProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// custom hook 🔥
export const useAdmin = () => useContext(AdminContext);
