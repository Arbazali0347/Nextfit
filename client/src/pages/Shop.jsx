import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/ShopContextProvider";

const ShopPage = () => {
    const { products } = useApp();

    const [selectedSize, setSelectedSize] = useState("");
    const [maxPrice, setMaxPrice] = useState(10000);
    const navigator = useNavigate();

    const filteredProducts = products.filter(
        (p) =>
            (selectedSize === "" || p.sizes.includes(selectedSize)) &&
            p.price <= maxPrice
    );

    return (
        <section className="min-h-screen bg-white text-black px-6 py-16 pt-32">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-12 text-center">
                    Shop Our Collection
                </h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-gray-100 p-6 rounded-2xl shadow-sm">

                    {/* Size Filter */}
                    <div>
                        <label className="mr-3 font-semibold text-black">
                            Filter by Size:
                        </label>
                        <select
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="">All</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">XL</option>
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <label className="mr-3 font-semibold text-black">
                            Max Price:
                        </label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black w-28"
                        />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            onClick={() => navigator(`/product/${product._id}`)}
                            className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                            />

                            <div className="p-5">
                                <h3 className="text-lg font-semibold mb-2 text-black">
                                    {product.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-2">
                                    {product.description.length > 80
                                        ? product.description.substring(0, 80) + "..."
                                        : product.description}
                                </p>

                                <p className="font-bold text-black mb-3">
                                    PKR {product.price}
                                </p>

                                <div className="flex gap-2 flex-wrap mb-4">
                                    {product.sizes.map((size) => (
                                        <span
                                            key={size}
                                            className="border border-gray-300 px-2 py-1 text-xs rounded text-gray-700"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full py-2 bg-black text-white font-semibold rounded-full hover:scale-105 hover:bg-gray-900 transition duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ShopPage;
