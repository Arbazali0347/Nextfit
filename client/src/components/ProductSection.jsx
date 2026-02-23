import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/ShopContextProvider";

const ProductSection = () => {
    const { products } = useApp();

    return (
        <section className="relative z-20 bg-white py-20 px-6 rounded-t-[40px] shadow-2xl">
            <div className="max-w-7xl mx-auto">

                <h2 className="text-4xl font-bold mb-14 text-center text-black">
                    Our Products
                </h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            className="group bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                            />

                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">
                                    {product.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-2">
                                    {product.description.length > 80
                                        ? product.description.substring(0, 80) + "..."
                                        : product.description}
                                </p>

                                <p className="font-bold text-black">
                                    PKR {product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <Link
                        to="/shop"
                        className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:scale-105 hover:bg-gray-900 transition duration-300"
                    >
                        More Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
