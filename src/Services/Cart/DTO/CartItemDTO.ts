export class CartItemDTO {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  modifiedAt?: Date;
  archivedAt?: Date;
}
