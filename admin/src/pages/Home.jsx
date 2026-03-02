import React, { useState } from "react";
import { Package, ShoppingCart, DollarSign, Search, Trash2, Edit, MoreVertical, Plus } from "lucide-react";
import { useAdmin } from "../Context/AdminProvider";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout"; // Import the layout we made above

const Home = () => {
  const { products, deleteProduct, orders } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const totalRevenue = orders.reduce(
    (acc, order) => acc + Number(order.totalPrice || 0),
    0
  );

  const stats = [
    { title: "Total Revenue", value: `PKR ${totalRevenue}`, icon: <DollarSign size={24} />, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Total Orders", value: orders.length, icon: <ShoppingCart size={24} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Total Products", value: products.length, icon: <Package size={24} />, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  // Filter products based on search
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Wrap content in Layout if not handled by Router
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back, here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#121214] p-6 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 hover:border-white/10 transition-colors">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-0.5">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Products Table Section */}
        <div className="bg-[#121214] border border-white/5 rounded-2xl shadow-xl overflow-hidden">

          {/* Table Header / Toolbar */}
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-white">Products Inventory</h2>

            <div className="flex w-full sm:w-auto gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 bg-[#09090b] border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all text-sm"
                />
              </div>

              <button
                onClick={() => navigate('/dashboard/add-product')}
                className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-yellow-400 transition-colors text-sm"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add New</span>
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="p-4 pl-6 font-medium">Product Name</th>
                  <th className="p-4 font-medium">Category/Tags</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Sizes</th>
                  <th className="p-4 pr-6 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="group hover:bg-white/[0.02] transition-colors">

                      {/* Product Name + Image */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 border border-white/10">
                            <img
                              src={product.images?.[0] || "https://via.placeholder.com/50"}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{product.title}</p>
                            <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[200px]">{product.description}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category (Dummy) */}
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                          Apparel
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-sm font-medium text-white">
                        PKR {product.price}
                      </td>

                      {/* Sizes */}
                      <td className="p-4">
                        <div className="flex gap-1 flex-wrap max-w-[150px]">
                          {product.sizes?.map((size, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-300">
                              {size}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/dashboard/edit/${product._id}`)}
                            className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No products found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (Visual Only) */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
            <span>Showing {filteredProducts.length} entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 bg-white/5 rounded hover:bg-white/10 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;