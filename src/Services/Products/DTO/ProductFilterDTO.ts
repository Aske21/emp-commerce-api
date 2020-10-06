export type OrderType = "ASC" | "DESC";

export class ProductFilterDTO {
  productNameQuery: string;
  categoryId: number;
  price: [number | null, number | null];
  sidx: string;
  sord: OrderType;
}
