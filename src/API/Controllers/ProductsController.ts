import cors from "cors";
import { Product } from "../../Models/Entities";
import { classToPlain } from "class-transformer";
import express, { Router, Request, Response } from "express";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import { ProductDTO, ProductFilterDTO } from "./../../Services/Products/DTO";
import ProductsServiceProvider from "../../Services/Products/ProductsService";

const ProductController: Router = express.Router();

const ProductsService = new ProductsServiceProvider() as ProductsServiceProvider;

ProductController.use(cors());

ProductController.post("/getAll", async (req: Request, res: Response) => {
  try {
    let products: Product[] = await ProductsService.GetAllProducts(req.body as ProductFilterDTO);
    if (products.length === 0) res.status(204);
    res.json(products);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.get("/archive", async (req: Request, res: Response) => {
  try {
    let archive: Product[] = await ProductsService.GetArchive();

    if (archive.length === 0) res.status(204);

    res.json(archive);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.get("/recommended", async (req: Request, res: Response) => {
  try {
    let recommended: Product[] = await ProductsService.GetRecommended();

    if (recommended.length === 0) res.status(204);

    res.json(recommended);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.get("/suggested/:categoryId", async (req: Request, res: Response) => {
  try {
    let suggested: Product[] = await ProductsService.GetSuggested(Number(req.params.categoryId));

    if (suggested.length === 0) res.status(204);

    res.json(suggested);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.get("/:id", async (req: Request, res: Response) => {
  try {
    res.json(await ProductsService.GetProduct(Number(req.params.id)));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.post(
  "/",

  async (req: Request, res: Response) => {
    try {
      res.status(201);
      res.json(await ProductsService.AddPrdouct(req.body as ProductDTO));
    } catch (err) {
      HandleAPIError(err, res);
    }
  }
);

ProductController.put("/:id", async (req: Request, res: Response) => {
  try {
    res.json(
      await ProductsService.UpdateProduct(
        Number(req.params.id),
        classToPlain(req.body) as ProductDTO,
        req.file.filename
      )
    );
  } catch (err) {
    HandleAPIError(err, res);
  }
});

ProductController.delete("/:id", async (req: Request, res: Response) => {
  try {
    res.json(await ProductsService.DeleteProduct(Number(req.params.id)));
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default ProductController;
