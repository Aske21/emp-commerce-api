import { Product } from "../../Models/Entities";
import { ProductDTO, ProductFilterDTO } from "../Products/DTO";

export interface IPrdouctService {
  GetAllProducts(dto: ProductFilterDTO): Promise<Product[]>;
  GetArchive(): Promise<Product[]>;
  GetRecommended(): Promise<Product[]>;
  GetSuggested(categoryId: number): Promise<Product[]>;
  GetProduct(productId: number): Promise<Product>;
  AddPrdouct(dto: ProductDTO, productImage: string): Promise<string>;
  UpdateProduct(productId: number, dto: ProductDTO, productImage: string): Promise<string>;
  DeleteProduct(productId: number): Promise<string>;
}
