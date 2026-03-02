import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    sizes: [
      {
        type: String,
        enum: ["S", "M", "L", "XL"],
        required: true,
      },
    ],

    images: [
      {
        type: String, // store image URLs
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Products = mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
