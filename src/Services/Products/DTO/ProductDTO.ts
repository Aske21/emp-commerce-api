import { Product } from "./../../../Models/Entities/Product";

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
