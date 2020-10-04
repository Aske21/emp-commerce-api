import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Index("cart_customer_id_fk", ["customerId"], {})
@Index("cart_product_id_fk", ["productId"], {})
@Entity("cart", { schema: "heroku_42df861642a2ede" })
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "customerId" })
  customerId: number;

  @Column("int", { name: "productId" })
  productId: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("float", { name: "totalPrice", nullable: true, precision: 12 })
  totalPrice: number | null;

  @Column("timestamp", { name: "createdAt", default: () => "CURRENT_TIMESTAMP", select: false })
  createdAt: Date;

  @Column("datetime", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
    select: false,
  })
  modifiedAt: Date;

  @Column("datetime", { name: "archivedAt", select: false })
  archivedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.carts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.carts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
