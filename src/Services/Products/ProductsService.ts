import moment from "moment";
import { ProductDTO, ProductFilterDTO } from "./DTO";
import { IPrdouctService } from "../Contracts";
import { classToPlain } from "class-transformer";
import { APIError } from "./../../Common/Error/APIError";
import { Category, Product, Productimage } from "../../Models/Entities";
import { createQueryBuilder, getConnection, getRepository } from "typeorm";
import responseMessages from "../../../responseMessages.config.json";
import Axios from "axios";

class ProductServiceProvider implements IPrdouctService {
  public GetAllProducts = async (dto: ProductFilterDTO): Promise<Product[]> => {
    let products = classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .innerJoinAndSelect("Product.productimages", "Productimage")
        .where("Product.archivedAt IS NULL")
        .orderBy(`Product.${dto.sidx ?? "createdAt"}`, dto.sord ?? "ASC")
        .getMany()
    ) as Product[];
    console.log(products);
    if (products.length === 0) return products;

    return ProductServiceProvider.FilterProducts(products, dto);
  };

  public GetArchive = async (): Promise<Product[]> => {
    return classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .innerJoinAndSelect("Product.productimages", "Productimage")
        .where("Product.archivedAt IS NOT NULL")
        .getMany()
    ) as Product[];
  };

  public GetRecommended = async (): Promise<Product[]> => {
    return classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .innerJoinAndSelect("Product.productimages", "Productimage")
        .where("Product.isRecommended = true")
        .andWhere("Product.archivedAt IS NULL")
        .getMany()
    ) as Product[];
  };

  public GetSuggested = async (categoryId: number): Promise<Product[]> => {
    return classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .innerJoinAndSelect("Product.productimages", "Productimage")
        .where("Product.categoryId = :categoryId", { categoryId: categoryId })
        .andWhere("Product.archivedAt IS NULL")
        .orderBy("RAND()")
        .take(4)
        .getMany()
    ) as Product[];
  };

  public GetProduct = async (productId: number): Promise<Product> => {
    let product = classToPlain(
      await createQueryBuilder(Product)
        .innerJoinAndSelect("Product.category", "Category")
        .innerJoinAndSelect("Product.productimages", "Productimage")
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

    let insertId = await (
      await getConnection().createQueryBuilder().insert().into(Product).values(product).execute()
    ).generatedMaps[0].id;

    return responseMessages.product.add.success + "\0" + insertId;
  };

  public UpdateProduct = async (
    productId: number,
    dto: ProductDTO,
    productImage: string
  ): Promise<string> => {
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

      if (!category) throw APIError.EntityNotFound(responseMessages.product.update.nonExistingCategory);
    }

    let updatedProduct: Product = dto;

    updatedProduct.id = product.id;
    updatedProduct.image = productImage;
    updatedProduct.createdAt = product.createdAt;
    updatedProduct.archivedAt = product.archivedAt;

    await getRepository(Product).save(updatedProduct);

    return responseMessages.product.update.success;
  };

  public DeleteProduct = async (productId: number): Promise<string> => {
    let product: Product = await createQueryBuilder(Product)
      .where("Product.id = :id", { id: productId })
      .addSelect("Product.archivedAt")
      .getOne();

    if (!product) throw APIError.EntityNotFound(responseMessages.product.delete.nonExistingProduct);
    else if (product.archivedAt !== null)
      throw APIError.EntityNotFound(responseMessages.product.delete.alreadyArchivedProduct);

    await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set({ archivedAt: moment().subtract("2", "hours").toDate() })
      .where("Product.id = :id", { id: productId })
      .execute();

    return responseMessages.product.delete.success;
  };

  private static FilterProducts = (products: Product[], dto: ProductFilterDTO) => {
    let filteredProducts: Product[] = products;

    if (dto.productNameQuery != "")
      filteredProducts = filteredProducts.filter((product) =>
        product.heading.toLowerCase().includes(dto.productNameQuery.toLowerCase())
      );

    if (dto.categoryId !== null)
      filteredProducts = filteredProducts.filter((product) => product.category.id === dto.categoryId);

    if (dto.price.length === 2)
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= dto.price[0] && product.price <= dto.price[1]
      );

    return filteredProducts;
  };
}

export default ProductServiceProvider;
