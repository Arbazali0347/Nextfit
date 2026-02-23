import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardNavbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { useAdmin } from "../Context/AdminProvider";

const sizeOptions = ["S", "M", "L", "XL"];

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProducts } = useAdmin();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    sizes: [],
    images: [], // old images
  });
  const [selectedImages, setSelectedImages] = useState([]); // new images
  const [message, setMessage] = useState("");

  // 🔹 Load existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const product = res.data.product;
        setFormData({
          title: product.title,
          description: product.description,
          price: product.price,
          sizes: product.sizes,
          images: product.images,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product ❌");
      }
    };
    fetchProduct();
  }, [id]);

  // 🔹 Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle size checkboxes
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let newSizes = [...formData.sizes];
    if (checked) newSizes.push(value);
    else newSizes = newSizes.filter((size) => size !== value);
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
  try {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);

    // ✅ Send sizes as JSON string
    data.append("sizes", JSON.stringify(formData.sizes));

    // Only send new images if selected
    selectedImages.forEach((img) => data.append("images", img));

    const res = await axios.put(
      `http://localhost:5000/api/products/${id}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      setMessage("Product updated successfully ✅");
      getProducts(); // refresh product list in context
      navigate("/");
    } else {
      toast.error(res.data.message);
      setMessage("Update failed ❌");
    }
  } catch (err) {
    console.error("Update Product Error:", err);
    toast.error("Error while updating product ❌");
    setMessage(err.message || "Error while updating product ❌");
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
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

          {/* Sizes */}
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

          {/* Preview Images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {/* Old images */}
            {formData.images.map((img, index) => (
              <div
                key={`old-${index}`}
                className="relative h-32 border-2 border-dashed border-gray-600 rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`old-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOldImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}

            {/* New selected images */}
            {selectedImages.map((img, index) => (
              <div
                key={`new-${index}`}
                className="relative h-32 border-2 border-dashed border-green-500 rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`new-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded font-semibold mt-4"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
