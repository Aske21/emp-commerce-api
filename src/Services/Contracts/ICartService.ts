import { Cart } from "../../Models/Entities";
import { AddToCartDTO } from "../Cart/DTO/AddToCartDTO";

export interface ICartService {
  GetCartContent(userId: number): Promise<Cart[]>;
  AddToCart(dto: AddToCartDTO, userId: number): Promise<string>;
  RemoveFromCart(cartId: number, userId: number): Promise<string>;
}
