import React from "react";
import { ShoppingCart, Package, PlusCircle, Edit, Trash2 } from "lucide-react";
import DashboardNavbar from "../components/Navbar";
import { useAdmin } from "../Context/AdminProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { products, deleteProduct } = useAdmin();
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <Package size={28} className="text-white" />,
      bg: "bg-blue-600",
    },
    {
      title: "Total Orders",
      value: 12,
      icon: <ShoppingCart size={28} className="text-white" />,
      bg: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Home</h1>

        {/* ✅ Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center p-4 rounded-xl shadow-lg ${stat.bg}`}
            >
              <div className="p-3 rounded-full bg-white/20 mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">All Products</h2>

          {products.length === 0 ? (
            <p className="text-white/60">No products found</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
                >
                  {/* Image */}
                  <div className="h-56 bg-black">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-white/40">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{product.title}</h3>

                    <p className="text-white/70 text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <p className="mt-2 font-semibold text-green-400">
                      Rs. {product.price}
                    </p>

                    {/* Sizes */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.sizes?.map((size, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-700 rounded"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      {/* Update */}
                      <button
                        onClick={() => navigate(`/dashboard/edit/${product._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg transition text-black font-semibold"
                      >
                        <Edit size={16} />
                        Update
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Welcome */}
        <div className="mt-12 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome, Black Aro! 👑
          </h2>
          <p className="text-white/80">
            Manage your Nextfit store like a pro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
