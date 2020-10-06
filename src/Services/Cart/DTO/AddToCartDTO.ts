import { Cart } from "./../../../Models/Entities/Cart";

export class AddToCartDTO extends Cart {
  productId: number;
  customerId: number;
  quantity: number;
}
