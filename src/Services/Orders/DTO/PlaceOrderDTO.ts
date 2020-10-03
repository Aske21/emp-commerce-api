import { Order } from "./../../../Models/Entities/Order";

export class PlaceOrderDTO extends Order {
  customerId: number;
  productId: number;
  quantity: number;
}
