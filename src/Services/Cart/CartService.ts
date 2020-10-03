import { ICartService } from "../Contracts/ICartService";
import { AddToCartDTO } from "./DTO/AddToCartDTO";
import { classToPlain } from "class-transformer";
import { createQueryBuilder, getConnection } from "typeorm";
import { Cart } from "./../../Models/Entities/Cart";
import moment from "moment";

class CartService implements ICartService {
  public GetCartContent = async (currentUserId: number): Promise<Cart[]> => {
    let response = await createQueryBuilder(Cart)
      .where("Cart.userId = :id", {
        id: currentUserId,
      })
      .getMany();

    return response;
  };

  public AddToCart = async (dto: AddToCartDTO, currentUserId: number) => {
    try {
      dto.userId = currentUserId;
      dto.createdAt = new Date();

      await getConnection().createQueryBuilder().insert().into(Cart).values(dto).execute();
      console.log("Restaurant successfully created");
      return "Restaurant successfully created";
    } catch (err) {
      console.log(err);
      return "An error occured";
    }
  };

  public RemoveFromCart = async (cartId: number, currentUserId: number) => {
    try {
      let response = await createQueryBuilder("Cart")
        .where("Cart.Id = :id", { id: cartId })
        .andWhere("Cart.userId = :id", { id: currentUserId })
        .andWhere("Cart.ArchivedAt IS NULL")
        .getOne();

      if (!response) {
        return "Error removing cart item";
      }

      await getConnection()
        .createQueryBuilder()
        .update(Cart)
        .set({ archivedAt: moment().format("YYYY-MM-DD HH:mm:ss") })
        .where("Cart.Id = :id", { id: cartId })
        .execute();

      return "Cart item successfully removed.";
    } catch (err) {
      console.log(err);
      return "Error removing cart item";
    }
  };
}

export default new CartService();
