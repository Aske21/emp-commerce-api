import { Order } from "../../Models/Entities/Order";
import { PlaceOrderDTO } from "../Order/DTO/PlaceOrderDTO";

export interface IOrderService {
  GetAllOrders(): Promise<Order[]>;
  GetOrder(orderId: number): Promise<Order>;
  PlaceOrder(dto: PlaceOrderDTO): Promise<string>;
  OrderCart(): Promise<string>;
  RemoveOrder(): Promise<string>;
}
