import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL, useApp } from "../context/ShopContextProvider";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState("");

  // Fetch product
  const GetProductById = async (id) => {
    try {
      const res = await axios.get(`${baseURL}/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);

        // ✅ Initialize selected size after product loaded
        if (res.data.product.sizes.length > 0) {
          setSelectedSize(res.data.product.sizes[0]);
        }
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    GetProductById(id);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <h2 className="text-2xl font-semibold">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size!");
    addToCart({ ...product, selectedSize });
  };

  return (
    <section className="min-h-screen bg-white text-black px-6 py-16 pt-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.images[0]} // ✅ use first image
            alt={product.title}
            className="w-full max-w-md object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-bold mb-6">PKR {product.price}</p>

          {/* Sizes */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-black text-white font-semibold rounded-full hover:scale-105 hover:bg-gray-900 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
