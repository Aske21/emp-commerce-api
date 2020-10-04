import { classToPlain } from "class-transformer";
import { AddToCartDTO } from "./DTO/AddToCartDTO";
import { Cart, Product } from "../../Models/Entities";
import { APIError } from "../../Common/Error/APIError";
import { ICartService } from "../Contracts/ICartService";
import { createQueryBuilder, getConnection } from "typeorm";
import responseMessages from "../../../responseMessages.config.json";
import moment from "moment";

class CartService implements ICartService {
  public GetCart = async (currentCustomerId: number): Promise<Cart[]> => {
    return classToPlain(
      await createQueryBuilder(Cart)
        .innerJoinAndSelect("Cart.product", "Product")
        .where("Cart.customerId = :id", {
          id: currentCustomerId,
        })
        .getMany()
    ) as Cart[];
  };

  public AddToCart = async (dto: AddToCartDTO, currentCustomerId: number): Promise<string> => {
    let product = await createQueryBuilder(Product)
      .where("Product.id = :id", {
        id: dto.productId,
      })
      .getOne();

    if (!product) throw APIError.EntityNotFound(responseMessages.cart.add.nonExistingProduct);

    dto.customerId = currentCustomerId;

    dto.totalPrice = product.price * dto.quantity;

    await getConnection().createQueryBuilder().insert().into(Cart).values(dto).execute();

    return responseMessages.cart.add.success;
  };

  public RemoveFromCart = async (cartId: number, currentCustomerId: number): Promise<string> => {
    let cartItem: Cart = await createQueryBuilder(Cart)
      .where("Cart.id = :cartId", { cartId: cartId })
      .andWhere("Cart.customerId = :customerId", { customerId: currentCustomerId })
      .getOne();

    if (!cartItem) throw APIError.EntityNotFound(responseMessages.cart.delete.nonExistingProduct);

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where("Cart.Id = :id", { id: cartId })
      .execute();

    return responseMessages.cart.delete.success;
  };
}

export default new CartService();
