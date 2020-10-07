import cors from "cors";
import express, { Request, Response, Router } from "express";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import { Category } from "../../Models/Entities";
import CategoriesServiceProvider from "../../Services/Categories/CategoriesServiceProvider";

const CategoryController: Router = express.Router();

const CategoryService = new CategoriesServiceProvider() as CategoriesServiceProvider;

CategoryController.use(cors());

CategoryController.get("/", async (req: Request, res: Response) => {
  try {
    let categories: Category[] = await CategoryService.GetCategories();

    if (categories.length === 0) res.status(204);

    res.json(categories);
  } catch (err) {
    HandleAPIError(err, res);
  }
});

export default CategoryController;
