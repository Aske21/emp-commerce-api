import { classToPlain } from "class-transformer";
import { createQueryBuilder } from "typeorm";

import { Category } from "../../Models/Entities";
import { ICategoryService } from "../Contracts";

class CategoriesServiceProvider implements ICategoryService {
  public GetCategories = async () => {
    return classToPlain(await createQueryBuilder(Category).getMany()) as Category[];
  };
}

export default CategoriesServiceProvider;
