import express from "express";
// import { getProducts } from "../controllers/Products";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productsController.js";
import upload from "../middlewares/multer.js";
// import { upload } from "../middlewares/multer.js";

const ProductRoute = express.Router();

// ✅ update product
ProductRoute.put(
    "/:id",
    upload.array("images", 4), // max 4 images
    updateProduct
);
ProductRoute.get("/get-products", getProducts)
ProductRoute.get("/:id", getProductById)
ProductRoute.post("/add-product", upload.array("images"), addProduct);
ProductRoute.post("/delete-product", deleteProduct)

export default ProductRoute;