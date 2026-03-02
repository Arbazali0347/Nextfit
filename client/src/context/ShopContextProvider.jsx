import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast"

const ShopContext = React.createContext();
export const baseURL = "http://localhost:5000/api/products";
export const ShopContextProvider = ({ children }) => {
    // Products
    const [products, setProducts] = useState([]);
    // Cart state as object { items: [], totalPrice: 0 }
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(false)

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

    const placeOrder = async (deliveryData) => {
        try {
            setLoading(true)
            const orderData = {
                shippingDetails: deliveryData,
                items: cart.items,
                totalPrice: cart.totalPrice,
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/order",
                orderData
            );

            if (data.success) {
                toast.success("Order placed successfully!");
                setLoading(false)
                setCart({ items: [], totalPrice: 0 });
                return { success: true };
            } else {
                setLoading(false)
                toast.error(data.message);
                return { success: false };
            }

        } catch (error) {
            console.error("Order Error:", error);
            return { success: false };
        }
    };

    // Add to cart with size check
    const addToCart = (product) => {
        // Check if same product + same size already exists
        const existingIndex = cart.items.findIndex(
            (item) => item._id === product._id && item.selectedSize === product.selectedSize
        );

        let updatedItems = [...cart.items];

        if (existingIndex >= 0) {
            // If exists, increase quantity
            updatedItems[existingIndex] = {
                ...updatedItems[existingIndex],
                quantity: (updatedItems[existingIndex].quantity || 1) + 1,
            };
        } else {
            // Else, add new product with quantity = 1
            updatedItems.push({ ...product, quantity: 1 });
        }

        const updatedTotal = updatedItems.reduce(
            (acc, item) => acc + item.price * (item.quantity || 1),
            0
        );

        setCart({
            items: updatedItems,
            totalPrice: updatedTotal,
        });
    };

    // Remove from cart
    const removeFromCart = (index) => {
        const updatedItems = cart.items.filter((_, i) => i !== index);
        const updatedTotal = updatedItems.reduce(
            (acc, item) => acc + item.price * (item.quantity || 1),
            0
        );

        setCart({
            items: updatedItems,
            totalPrice: updatedTotal,
        });
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);



    const value = {
        products,
        cart,
        addToCart,
        removeFromCart,
        placeOrder,
        loading
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useApp = () => useContext(ShopContext);

export default ShopContextProvider;
