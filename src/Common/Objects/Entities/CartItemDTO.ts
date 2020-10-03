export class CartItemDTO {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  modifiedAt?: Date;
  archivedAt?: Date;
}
