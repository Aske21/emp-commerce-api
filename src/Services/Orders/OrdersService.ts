import { classToPlain } from "class-transformer";
import { Order } from "../../Models/Entities/Order";
import { PlaceOrderDTO } from "./DTO/PlaceOrderDTO";
import { Cart, Product } from "../../Models/Entities";
import { APIError } from "./../../Common/Error/APIError";
import { Customer } from "./../../Models/Entities/Customer";
import { createQueryBuilder, getConnection } from "typeorm";
import { IOrderService } from "../Contracts/IOrdersService";

import responseMessages from "../../../responseMessages.config.json";
import moment from "moment";

class OrdersService implements IOrderService {
  public GetAllOrders = async (): Promise<Order[]> => {
    return classToPlain(
      await createQueryBuilder(Order)
        .innerJoinAndSelect("Order.customer", "Customer")
        .innerJoinAndSelect("Order.product", "Product")
        .where("Order.archivedAt IS NULL")
        .getMany()
    ) as Order[];
  };

  public GetArchive = async (): Promise<Order[]> => {
    return classToPlain(
      await createQueryBuilder(Order)
        .innerJoinAndSelect("Order.customer", "Customer")
        .innerJoinAndSelect("Order.product", "Product")
        .where("Order.archivedAt IS NOT NULL")
        .getMany()
    ) as Order[];
  };

  public GetOrder = async (orderId: number): Promise<Order> => {
    let order = classToPlain(
      await createQueryBuilder(Order)
        .where("Order.id = :id", {
          id: orderId,
        })
        .innerJoinAndSelect("Order.customer", "Customer")
        .innerJoinAndSelect("Order.product", "Product")
        .where("Order.archivedAt IS NULL")
        .getOne()
    ) as Order;

    if (!order) throw APIError.EntityNotFound(responseMessages.order.getOne.nonExistingOrder);

    return order;
  };

  public PlaceOrder = async (dto: PlaceOrderDTO): Promise<string> => {
    let customer: Customer = await createQueryBuilder(Customer)
      .where("Customer.id = :id", {
        id: dto.customerId,
      })
      .getOne();

    if (!customer) throw APIError.EntityNotFound(responseMessages.order.add.nonExistingCustomer);

    let product: Product = await createQueryBuilder(Product)
      .where("Product.id = :id", {
        id: dto.productId,
      })
      .getOne();

    if (!product) throw APIError.EntityNotFound(responseMessages.order.add.nonExistingProduct);

    let order: Order = dto;

    order.totalPrice = product.price * dto.quantity;

    await getConnection().createQueryBuilder().insert().into(Order).values(order).execute();

    return responseMessages.order.add.success;
  };

  public OrderCart = async (currentCustomerId: number): Promise<string> => {
    let orders = classToPlain(
      (await createQueryBuilder(Cart)
        .where("Cart.customerId = :id", {
          id: currentCustomerId,
        })
        .select("Cart.customerId", "customerId")
        .getMany()) as Cart[]
    );

    Object.values(orders).map((orderId) => {
      console.log(orderId);
    });

    throw new Error("Method not implemented");
  };

  public RemoveOrder = async (orderId: number): Promise<string> => {
    let order: Order = await createQueryBuilder(Order)
      .where("Order.id = :id", { id: orderId })
      .addSelect("Order.archivedAt")
      .getOne();

    if (!order) throw APIError.EntityNotFound(responseMessages.order.delete.nonExistingOrder);
    else if (order.archivedAt !== null)
      throw APIError.EntityNotFound(responseMessages.order.delete.alreadyArchivedOrder);

    await getConnection()
      .createQueryBuilder()
      .update(Order)
      .set({ archivedAt: moment().subtract("2", "hours").toDate() })
      .where("Order.id = :id", { id: order.id })
      .execute();

    return responseMessages.order.delete.success;
  };
}

export default new OrdersService();
