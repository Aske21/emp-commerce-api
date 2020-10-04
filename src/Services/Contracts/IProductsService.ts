import { Product } from "../../Models/Entities";
import { ProductDTO } from "../Products/DTO/ProductDTO";

export interface IPrdouctService {
  GetAllProducts(): Promise<Product[]>;
  GetArchive(): Promise<Product[]>;
  GetProduct(productId: number): Promise<Product>;
  AddPrdouct(dto: ProductDTO): Promise<string>;
  UpdateProduct(productId: number, dto: ProductDTO): Promise<string>;
  DeleteProduct(productId: number): Promise<string>;
}
