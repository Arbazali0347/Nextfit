import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAdmin } from "../Context/AdminProvider";
import { UploadCloud, X, Save, Type, DollarSign, AlignLeft, Image as ImageIcon } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const sizeOptions = ["S", "M", "L", "XL"];

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProducts, baseURL } = useAdmin();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    sizes: [],
    images: [], // old images
  });
  const [selectedImages, setSelectedImages] = useState([]); // new images

  // 🔹 Load existing product
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${baseURL}/products/${id}`);
        const product = res.data.product;
        setFormData({
          title: product.title,
          description: product.description,
          price: product.price,
          sizes: product.sizes || [],
          images: product.images || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product details ❌");
        navigate("/"); // Redirect back if error
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // 🔹 Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Modern pill-style size selection
  const handleSizeToggle = (size) => {
    let newSizes = [...formData.sizes];
    if (newSizes.includes(size)) {
      newSizes = newSizes.filter((s) => s !== size);
    } else {
      newSizes.push(size);
    }
    setFormData({ ...formData, sizes: newSizes });
  };

  // 🔹 Handle new images selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };

  // 🔹 Remove old image preview
  const handleRemoveOldImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  // 🔹 Remove new image preview
  const handleRemoveNewImage = (index) => {
    const newSelected = [...selectedImages];
    newSelected.splice(index, 1);
    setSelectedImages(newSelected);
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }
    if (formData.images.length === 0 && selectedImages.length === 0) {
      toast.error("Product must have at least one image.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);

      // ✅ Send sizes as JSON string
      data.append("sizes", JSON.stringify(formData.sizes));

      // Append old images that are kept (if your backend needs this to know what to keep)
      // data.append("existingImages", JSON.stringify(formData.images)); 

      // Only send new images if selected
      selectedImages.forEach((img) => data.append("images", img));

      const res = await axios.put(
        `${baseURL}/products/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Product updated successfully!");
        getProducts(); // refresh product list in context
        navigate("/");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error("Update Product Error:", err);
      toast.error(err.response?.data?.message || "Error while updating product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-yellow-500">
            <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
            <p className="font-medium">Loading Product...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-white/5 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Product</h1>
          <p className="text-gray-400 text-sm">Update the details or images for this product.</p>
        </div>

        {/* Main Form */}
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
                    placeholder="Product Title"
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
                    placeholder="Price"
                    className="w-full bg-[#09090b] border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder-gray-600"
                    required
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
                    placeholder="Product Description"
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
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Add New Images</label>
                <div className="relative w-full h-32 bg-[#09090b] border-2 border-dashed border-white/20 rounded-xl hover:border-yellow-500/50 transition-colors flex flex-col items-center justify-center cursor-pointer group overflow-hidden">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center text-center p-4">
                    <UploadCloud size={28} className="text-gray-400 group-hover:text-yellow-500 mb-2 transition-colors" />
                    <p className="text-sm text-gray-300 font-medium">Click to upload new images</p>
                  </div>
                </div>
              </div>

              {/* Preview Grid */}
              {(formData.images.length > 0 || selectedImages.length > 0) && (
                <div className="bg-[#09090b] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <ImageIcon size={14} />
                    <span>Current Gallery ({formData.images.length + selectedImages.length})</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {/* Old Images */}
                    {formData.images.map((img, index) => (
                      <div key={`old-${index}`} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                        <img src={img} alt={`old-${index}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-80" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <button
                          type="button"
                          onClick={() => handleRemoveOldImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                          title="Remove existing image"
                        >
                          <X size={14} strokeWidth={3} />
                        </button>
                      </div>
                    ))}

                    {/* New Selected Images */}
                    {selectedImages.map((img, index) => (
                      <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden border-2 border-yellow-500/50 group">
                        <img src={URL.createObjectURL(img)} alt={`new-${index}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute top-0 left-0 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg z-10">New</div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                          title="Remove new image"
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
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditProductPage;