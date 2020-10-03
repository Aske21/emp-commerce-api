import { classToPlain } from "class-transformer";
import { createQueryBuilder } from "typeorm";
import { Order } from "../../Models/Entities/Order";
import { IOrderService } from "./../Contracts/IOrderService";
import { APIError } from "./../../Common/Error/APIError";
import responseMessages from "../../../responseMessages.config.json";
import { PlaceOrderDTO } from "./DTO/PlaceOrderDTO";
import { Customer } from "./../../Models/Entities/Customer";

class OrdersService implements IOrderService {
  public GetAllOrders = async (): Promise<Order[]> => {
    return classToPlain(await createQueryBuilder(Order).getMany()) as Order[];
  };

  public GetOrder = async (orderId: number): Promise<Order> => {
    let order: Order = classToPlain(
      await createQueryBuilder(Order)
        .where("Order.id = :id", {
          id: orderId,
        })
        .getMany()
    ) as Order;

    if (!order) throw APIError.EntityNotFound(responseMessages.orderError.getOne.nonExistingOrder);

    return order;
  };

  public PlaceOrder = async (dto: PlaceOrderDTO): Promise<string> => {
    let customer = (await createQueryBuilder(Customer)
      .where("Customer.id = :id", {
        id: dto.userId,
      })
      .getOne()) as Customer;

    if (!customer) throw APIError.EntityNotFound(responseMessages.orderError.add.nonExistingUser);

    // dto.userId = current;
    // dto.createdAt = new Date();
    // dto.totalPrice = product.price * dto.quantity;

    // await getConnection().createQueryBuilder().insert().into(Cart).values(dto).execute();

    return responseMessages.cartError.add.success;
  };

  OrderCart(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  RemoveOrder(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}

export default new OrdersService();
