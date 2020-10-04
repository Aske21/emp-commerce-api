import { classToPlain } from "class-transformer";
import { createQueryBuilder, getConnection } from "typeorm";
import { Category, Product } from "../../Models/Entities";
import { IPrdouctService } from "../Contracts/IProductsService";
import { ProductDTO } from "./DTO/ProductDTO";
import { APIError } from "./../../Common/Error/APIError";

import responseMessages from "../../../responseMessages.config.json";
import moment from "moment";

class OrdersService implements IPrdouctService {
  public GetAllProducts = async (): Promise<Product[]> => {
    return classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .where("Product.archivedAt IS NULL")
        .getMany()
    ) as Product[];
  };

  public GetArchive = async (): Promise<Product[]> => {
    return classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .where("Product.archivedAt IS NOT NULL")
        .getMany()
    ) as Product[];
  };

  public GetProduct = async (productId: number): Promise<Product> => {
    let product = classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .where("Product.id = :id", { id: productId })
        .andWhere("Product.archivedAt IS NULL")
        .getOne()
    ) as Product;

    if (!product) throw APIError.EntityNotFound(responseMessages.product.getOne.nonExistingProduct);

    return product;
  };

  public AddPrdouct = async (dto: ProductDTO): Promise<string> => {
    let category: Category = await createQueryBuilder(Category)
      .where("Category.id = :id", {
        id: dto.categoryId,
      })
      .getOne();

    if (!category) throw APIError.EntityNotFound(responseMessages.product.add.nonExistingCategory);

    let product: Product = dto;

    await getConnection().createQueryBuilder().insert().into(Product).values(product).execute();

    return responseMessages.product.add.success;
  };

  public UpdateProduct = async (productId: number, dto: ProductDTO): Promise<string> => {
    let product: Product = await createQueryBuilder(Product)
      .where("Product.id = :id", {
        id: productId,
      })
      .addSelect("Product.createdAt")
      .addSelect("Product.archivedAt")
      .getOne();

    if (!product) throw APIError.EntityNotFound(responseMessages.product.update.nonExistingProduct);

    if (product.categoryId !== dto.categoryId) {
      let category: Category = await createQueryBuilder(Category)
        .where("Category.id = :id", {
          id: dto.categoryId,
        })
        .getOne();

      if (!category)
        throw APIError.EntityNotFound(responseMessages.product.update.nonExistingCategory);
    }

    let updatedProduct: Product = dto;

    updatedProduct.id = product.id;
    updatedProduct.createdAt = product.createdAt;
    updatedProduct.archivedAt = product.archivedAt;

    await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set(updatedProduct)
      .where("Product.id = :id", { id: productId })
      .execute();

    return responseMessages.product.update.success;
  };

  public DeleteProduct = async (productId: number): Promise<string> => {
    let product: Product = await createQueryBuilder(Product)
      .where("Product.id = :id", { id: productId })
      .getOne();

    if (!product) throw APIError.EntityNotFound(responseMessages.product.delete.nonExistingProduct);

    await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set({ archivedAt: "new Date(new Date.now())" })
      .where("Product.id = :id", { id: productId })
      .execute();

    return responseMessages.product.delete.success;
  };
}

export default new OrdersService();
