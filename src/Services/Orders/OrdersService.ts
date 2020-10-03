import { classToPlain } from "class-transformer";
import { Order } from "../../Models/Entities/Order";
import { PlaceOrderDTO } from "./DTO/PlaceOrderDTO";
import { Cart, Product } from "../../Models/Entities";
import { APIError } from "./../../Common/Error/APIError";
import { Customer } from "./../../Models/Entities/Customer";
import { createQueryBuilder, getConnection } from "typeorm";
import { IOrderService } from "./../Contracts/IOrderService";
import responseMessages from "../../../responseMessages.config.json";

class OrdersService implements IOrderService {
  public GetAllOrders = async (): Promise<Order[]> => {
    return classToPlain(
      await createQueryBuilder(Order).where("archivedAt IS NULL").getMany()
    ) as Order[];
  };

  public GetArchive = async (): Promise<Order[]> => {
    return classToPlain(
      await createQueryBuilder(Order).where("archivedAt IS NOT NULL").getMany()
    ) as Order[];
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
    let customer: Customer = await createQueryBuilder(Customer)
      .where("Customer.id = :id", {
        id: dto.customerId,
      })
      .getOne();

    if (!customer) throw APIError.EntityNotFound(responseMessages.orderError.add.nonExistingUser);

    let product: Product = await createQueryBuilder(Product)
      .where("Product.id = :id", {
        id: dto.productId,
      })
      .getOne();

    if (!product) throw APIError.EntityNotFound(responseMessages.orderError.add.nonExistingProduct);

    let order: Order = dto;

    order.createdAt = new Date();
    order.totalPrice = product.price * dto.quantity;

    await getConnection().createQueryBuilder().insert().into(Cart).values(dto).execute();

    return responseMessages.orderError.add.success;
  };

  public OrderCart = async (currentCustomerId: number): Promise<string> => {
    let orders = classToPlain(
      (await createQueryBuilder(Cart)
        .where("Cart.userId = :id", {
          id: currentCustomerId,
        })
        .select("Cart.userId", "userId")
        .getMany()) as Cart[]
    );

    Object.values(orders).map((orderId) => {
      console.log(orderId);
    });

    return "N0ice";
  };

  public RemoveOrder = async (orderId: number): Promise<string> => {
    let order: Order = await createQueryBuilder(Order)
      .where("Order.id = :id", { id: orderId })
      .andWhere("Cart.userId = :userId", { userId: orderId })
      .getOne();

    if (!order) throw APIError.EntityNotFound(responseMessages.orderError.delete.nonExistingOrder);

    await getConnection()
      .createQueryBuilder()
      .update(Order)
      .set({ archivedAt: new Date() })
      .where("Order.id = :id", { id: order.id })
      .execute();

    return responseMessages.orderError.delete.success;
  };
}

export default new OrdersService();
