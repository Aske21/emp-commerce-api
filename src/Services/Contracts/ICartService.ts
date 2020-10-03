import { AddToCartDTO } from "../Cart/DTO/AddToCartDTO";

export interface ICartService {
  GetCartContent(userId: number);
  AddToCart(dto: AddToCartDTO, userId: number);
  RemoveFromCart(cartId: number, userId: number);
}
