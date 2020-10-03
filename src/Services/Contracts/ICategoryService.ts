import { Category } from "../../Models/Entities";

export interface ICategoryService {
  GetCategories(): Promise<Category[]>;
}
