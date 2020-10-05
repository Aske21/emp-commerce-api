import { Order } from "../../Models/Entities/Order";
import { PlaceOrderDTO } from "../Orders/DTO";

export interface IOrderService {
  GetAllOrders(): Promise<Order[]>;
  GetArchive(): Promise<Order[]>;
  GetOrder(orderId: number): Promise<Order>;
  PlaceOrder(dto: PlaceOrderDTO): Promise<string>;
  OrderCart(currentCustomerId: number): Promise<string>;
  RemoveOrder(orderId: number): Promise<string>;
}
