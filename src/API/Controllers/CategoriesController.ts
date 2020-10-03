import cors from "cors";
import express, { Request, Response, Router } from "express";
import { HandleAPIError } from "../../Common/Error/HandleAPIError";
import { Category } from "../../Models/Entities";
import CategoryService from "../../Services/Categories/CategoriesService";

const CategoryController: Router = express.Router();

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
