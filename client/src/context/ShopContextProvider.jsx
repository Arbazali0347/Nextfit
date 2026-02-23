import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ShopContext = React.createContext();
export const baseURL = "http://localhost:5000/api/products";
export const ShopContextProvider = ({ children }) => {
    // Products
    const [products, setProducts] = useState([]);
    // Cart state as object { items: [], totalPrice: 0 }
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });

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
    useEffect(() => {
        getProducts();
    }, []);

    const placeOrder = async (deliveryData) => {
        try {
            const orderData = {
                customer: deliveryData,
                items: cart.items,
                totalPrice: cart.totalPrice,
                paymentMethod: "COD",
                status: "Pending",
            };

            const res = await axios.post(
                "http://localhost:5000/api/orders",
                orderData
            );

            console.log("Order Sent:", res.data);

            // Clear cart after success
            setCart({ items: [], totalPrice: 0 });

        } catch (error) {
            console.error("Order Error:", error);
        }
    };


    // Add to cart
    const addToCart = (product) => {
        const updatedItems = [...cart.items, product];
        const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price, 0);

        setCart({
            items: updatedItems,
            totalPrice: updatedTotal,
        });
    };

    // Remove from cart
    const removeFromCart = (index) => {
        const updatedItems = cart.items.filter((_, i) => i !== index);
        const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price, 0);

        setCart({
            items: updatedItems,
            totalPrice: updatedTotal,
        });
    };

    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);



    const value = {
        products,
        cart,
        addToCart,
        removeFromCart,
        placeOrder
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useApp = () => useContext(ShopContext);

export default ShopContextProvider;
