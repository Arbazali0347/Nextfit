import Products from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ==============================
// Add Product
// ==============================
const addProduct = async (req, res) => {
  try {
    const { title, description, price, sizes } = req.body;

    // multer files
    const files = req.files || [];

    if (!files.length) {
      return res.json({
        success: false,
        message: "No images uploaded",
      });
    }

    // 🔥 upload to cloudinary
    const imageUrl = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });

        // 🧹 delete local file after upload
        fs.unlinkSync(file.path);

        return result.secure_url;
      })
    );

    const newProduct = new Products({
      title,
      description,
      price,
      sizes,
      images: imageUrl,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    res.json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// ==============================
// Update Product
// ==============================

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, sizes } = req.body;

    // 🔍 find existing product
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🖼️ NEW IMAGES CHECK
    let updatedImages = product.images; // default old images

    if (req.files && req.files.length > 0) {
      // 👉 only upload new selected images
      const uploadPromises = req.files.map(file =>
        cloudinary.uploader.upload(file.path, {
          folder: "nextfit_products",
        })
      );

      const uploaded = await Promise.all(uploadPromises);

      updatedImages = uploaded.map(img => img.secure_url);
    }

    // ✏️ update fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.sizes = sizes ? JSON.parse(sizes) : product.sizes;
    product.images = updatedImages;

    await product.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ==============================
// Delete Product
// ==============================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    await Products.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// ==============================
// Get Products
// ==============================
const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
}




export { addProduct, updateProduct, deleteProduct, getProducts };
