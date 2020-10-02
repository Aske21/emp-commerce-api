import cors from "cors";
import express from "express";

const ProductController = express.Router();

ProductController.use(cors());

ProductController.get("/fetchAll", (req, res) => {
  //   ProductService.FetchAllProducts(req.body, res);
});

ProductController.get("/fetch/:id", (req, res) => {
  //   ProductService.FetchProduct(req.params.id, res);
});

export default ProductController;
