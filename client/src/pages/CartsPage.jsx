import React from "react";
import { useApp } from "../context/ShopContextProvider";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart } = useApp();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-10 text-center">
          Your Cart
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Side – Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.items.map((product, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 p-4 rounded-xl gap-4 relative shadow-sm"
              >
                <X
                  onClick={() => removeFromCart(index)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 cursor-pointer"
                  size={20}
                />

                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm">
                    {product.description}
                  </p>

                  {product.selectedSize && (
                    <p className="text-gray-700 text-sm mt-1">
                      Size:{" "}
                      <span className="font-semibold text-black">
                        {product.selectedSize}
                      </span>
                    </p>
                  )}
                </div>

                <p className="font-bold text-black">
                  PKR {product.price}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side – Summary */}
          <div className="w-full md:w-96 bg-gray-50 p-6 rounded-2xl shadow-md flex flex-col gap-6">
            
            <h2 className="text-2xl font-bold text-black">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-700">
              <span>Total Items:</span>
              <span>{cart.items.length}</span>
            </div>

            <div className="flex justify-between text-black font-semibold text-lg">
              <span>Total Price:</span>
              <span>PKR {cart.totalPrice}</span>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl text-gray-700">
              Payment Method:{" "}
              <span className="font-semibold text-black">
                Cash on Delivery (COD)
              </span>
            </div>

            <button
              onClick={() => navigate("/delivery")}
              className="w-full py-3 bg-black text-white font-semibold rounded-full hover:scale-105 hover:bg-gray-900 transition duration-300"
            >
              Proceed to Delivery
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
