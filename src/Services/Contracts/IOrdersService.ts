import { Order } from "../../Models/Entities/Order";
import { GetOrderDTO, PlaceOrderDTO } from "../Orders/DTO";

export interface IOrderService {
  GetAllOrders(): Promise<Order[]>;
  GetArchive(): Promise<Order[]>;
  GetOrder(dto: GetOrderDTO, orderId: number): Promise<Order>;
  PlaceOrder(dto: PlaceOrderDTO, customerId: number): Promise<string>;
  OrderCart(currentCustomerId: number): Promise<string>;
  RemoveOrder(orderId: number): Promise<string>;
}
