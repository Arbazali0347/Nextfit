import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAdmin } from "../Context/AdminProvider";
import { useNavigate } from "react-router-dom";
import { UploadCloud, X, PlusCircle, Type, DollarSign, AlignLeft } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout"; // Assuming this is your wrapper

const sizeOptions = ["S", "M", "L", "XL"];

const AddProduct = () => {
  const navigate = useNavigate();
  const { getProducts, baseURL } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    sizes: [],
    images: [],
  });

  // Text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Modern pill-style size selection
  const handleSizeToggle = (size) => {
    let newSizes = [...formData.sizes];
    if (newSizes.includes(size)) {
      newSizes = newSizes.filter((s) => s !== size);
    } else {
      newSizes.push(size);
    }
    setFormData({ ...formData, sizes: newSizes });
  };

  // Handle multiple images dynamically
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // Remove selected image
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }
    if (formData.images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      formData.sizes.forEach((size) => data.append("sizes[]", size));
      formData.images.forEach((img) => data.append("images", img));

      const res = await axios.post(
        `${baseURL}/products/add-product`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Product added successfully!");
        setFormData({ title: "", description: "", price: "", sizes: [], images: [] });
        getProducts();
        navigate("/");
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error while adding product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-gray-400 text-sm">Fill in the details below to add a new item to your store.</p>
        </div>

        {/* Main Form Box */}
        <form onSubmit={handleSubmit} className="bg-[#121214] border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/5 pb-2">Basic Details</h2>
              
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Product Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Classic Black Oversized Tee"
                    className="w-full bg-[#09090b] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Price (PKR)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-[#09090b] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-4 text-gray-500" size={18} />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the product details, material, and fit..."
                    className="w-full bg-[#09090b] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600 resize-none h-32"
                    required
                  />
                </div>
              </div>

              {/* Sizes Selection */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Available Sizes *</label>
                <div className="flex gap-3">
                  {sizeOptions.map((size) => {
                    const isSelected = formData.sizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isSelected
                            ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                            : "bg-[#09090b] border border-white/10 text-gray-400 hover:border-white/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Media */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/5 pb-2">Product Media</h2>
              
              {/* Image Upload Area */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Upload Images *</label>
                <div className="relative w-full h-40 bg-[#09090b] border-2 border-dashed border-white/20 rounded-xl hover:border-yellow-500/50 transition-colors flex flex-col items-center justify-center cursor-pointer group overflow-hidden">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-colors">
                      <UploadCloud size={24} className="text-gray-400 group-hover:text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-300 font-medium">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Preview Grid */}
              {formData.images.length > 0 && (
                <div className="bg-[#09090b] p-4 rounded-xl border border-white/5">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Selected Images ({formData.images.length})</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`preview-${index}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Form Actions */}
          <div className="mt-10 pt-6 border-t border-white/5 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 rounded-xl font-medium text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-black transition-all ${
                isSubmitting 
                  ? "bg-yellow-500/50 cursor-not-allowed" 
                  : "bg-yellow-500 hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <PlusCircle size={18} />
                  Publish Product
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddProduct;