import { Cart } from "../../Models/Entities";
import { AddToCartDTO } from "../Cart/DTO";

export interface ICartService {
  GetCart(currentCustomerId: number): Promise<Cart[]>;
  AddToCart(dto: AddToCartDTO, currentCustomerId: number): Promise<string>;
  RemoveFromCart(cartId: number, currentCustomerId: number): Promise<string>;
}
