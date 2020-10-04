import cors from "cors";
import express, { Router, Request, Response } from "express";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import { Order, Product } from "../../Models/Entities";
import OrdersService from "../../Services/Orders/OrdersService";
import ProductsService from "../../Services/Products/ProductsService";

const ProductController: Router = express.Router();

ProductController.use(cors());

ProductController.get("/", async (req, res) => {
  try {
    let products: Product[] = await ProductsService.GetAllProducts();

    if (products.length === 0) res.status(204);

    res.json(products);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.get("/archive", async (req, res) => {
  try {
    let archive: Product[] = await ProductsService.GetArchive();

    if (archive.length === 0) res.status(204);

    res.json(archive);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.get("/:id", async (req, res) => {
  try {
    res.json(await ProductsService.GetProduct(Number(req.params.id)));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.post("/", async (req, res) => {
  try {
    res.json(await ProductsService.AddPrdouct(req.body));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.put("/:id", async (req, res) => {
  try {
    res.json(await ProductsService.UpdateProduct(Number(req.params.id), req.body));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.delete("/:id", async (req, res) => {
  try {
    res.json(await ProductsService.DeleteProduct(Number(req.params.id)));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default ProductController;
