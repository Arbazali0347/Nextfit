import React, { useState } from "react";
import axios from "axios";
import DashboardNavbar from "../components/Navbar"; // Navbar import karo
import { toast } from "react-hot-toast"; // Toast notifications ke liye
import { useAdmin } from "../Context/AdminProvider";
import { useNavigate } from "react-router-dom";

const sizeOptions = ["S", "M", "L", "XL"];

const AddProduct = () => {
  const navigate = useNavigate();
  const { getProducts } = useAdmin();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    sizes: [],
    images: [],
  });

  const [message, setMessage] = useState("");

  // Text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Checkbox sizes
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let newSizes = [...formData.sizes];
    if (checked) newSizes.push(value);
    else newSizes = newSizes.filter((size) => size !== value);
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
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      formData.sizes.forEach((size) => data.append("sizes[]", size));
      formData.images.forEach((img) => data.append("images", img));

      const res = await axios.post(
        "http://localhost:5000/api/products/add-product",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setMessage("Product added successfully ✅");
        setFormData({
          title: "",
          description: "",
          price: "",
          sizes: [],
          images: [],
        });
        getProducts()
        navigate("/");
      } else {
        toast.error(res.data.message);
        setMessage("Failed to add product ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while adding product ❌");
      setMessage(err.message || "Error while adding product ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
        {message && <p className="mb-4 text-green-400 font-semibold">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            rows={4}
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
            required
          />

          {/* Sizes Checkboxes */}
          <div className="flex space-x-6">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={size}
                  checked={formData.sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="accent-green-500 w-5 h-5"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>

          {/* Image Upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
          />

          {/* Preview Selected Images */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
              {formData.images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-32 border-2 border-dashed border-gray-600 rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded font-semibold mt-4"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
