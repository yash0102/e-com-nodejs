const express = require("express");
const productRouter = express.Router();
const productController = require("./product.controller.js")

productRouter.post("/",productController.addProduct);
productRouter.patch("/:id",productController.updateProduct);
productRouter.get("/",productController.getAllProducts);
productRouter.get("/:id",productController.getProductById);
productRouter.get("/search",productController.searchProducts);
productRouter.delete("/:id",productController.deleteProductById);

module.exports = productRouter;