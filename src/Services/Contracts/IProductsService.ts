import { Product } from "../../Models/Entities";
import { ProductDTO } from "../Products/DTO";

export interface IPrdouctService {
  GetAllProducts(): Promise<Product[]>;
  GetArchive(): Promise<Product[]>;
  GetRecommended(): Promise<Product[]>;
  GetProduct(productId: number): Promise<Product>;
  AddPrdouct(dto: ProductDTO, productImage: string): Promise<string>;
  UpdateProduct(productId: number, dto: ProductDTO, productImage: string): Promise<string>;
  DeleteProduct(productId: number): Promise<string>;
}
