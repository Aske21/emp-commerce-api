import { Product } from "./../../../Models/Entities/Product";
import { Category } from "./../../../Models/Entities/Category";

export class ProductDTO extends Product {
  heading: string;
  subheading: string;
  categoryId: number;
  image: string;
  description: string;
  fullDescription: string;
  price: number;
  secondPrice: number;
}
