import { classToPlain } from "class-transformer";
import { AddToCartDTO } from "./DTO/AddToCartDTO";
import { Cart, Product } from "../../Models/Entities";
import { APIError } from "../../Common/Error/APIError";
import { ICartService } from "../Contracts/ICartService";
import { createQueryBuilder, getConnection } from "typeorm";
import responseMessages from "../../../responseMessages.config.json";

class CartService implements ICartService {
  public GetCart = async (currentUserId: number): Promise<Cart[]> => {
    return classToPlain(
      await createQueryBuilder(Cart)
        .where("Cart.userId = :id", {
          id: currentUserId,
        })
        .getMany()
    ) as Cart[];
  };

  public AddToCart = async (dto: AddToCartDTO, currentUserId: number): Promise<string> => {
    let product = await createQueryBuilder(Product)
      .where("Product.id = :id", {
        id: dto.productId,
      })
      .getOne();

    if (!product) throw APIError.EntityNotFound(responseMessages.cartError.add.nonExistingProduct);

    dto.userId = currentUserId;
    dto.createdAt = new Date();
    dto.totalPrice = product.price * dto.quantity;

    await getConnection().createQueryBuilder().insert().into(Cart).values(dto).execute();

    return responseMessages.cartError.add.success;
  };

  public RemoveFromCart = async (cartId: number, currentUserId: number): Promise<string> => {
    let cartItem: Cart = await createQueryBuilder(Cart)
      .where("Cart.id = :cartId", { cartId: cartId })
      .andWhere("Cart.userId = :userId", { userId: currentUserId })
      .getOne();

    if (!cartItem)
      throw APIError.EntityNotFound(responseMessages.cartError.delete.nonExistingProduct);

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where("Cart.Id = :id", { id: cartId })
      .execute();

    return responseMessages.cartError.delete.success;
  };
}

export default new CartService();
