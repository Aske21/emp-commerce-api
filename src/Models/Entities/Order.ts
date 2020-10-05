import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Index("order_product_id_fk", ["productId"], {})
@Index("order_customer_id_fk", ["customerId"], {})
@Entity("order", { schema: "heroku_42df861642a2ede" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "customerId" })
  customerId: number;

  @Column("int", { name: "productId" })
  productId: number;

  @Column("int", { name: "quantity", default: () => "'1'" })
  quantity: number;

  @Column("float", { name: "totalPrice", precision: 12 })
  totalPrice: number;

  @Column("timestamp", { name: "createdAt", default: () => "CURRENT_TIMESTAMP", select: false })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    select: false,
  })
  modifiedAt: Date;

  @Column("datetime", { name: "archivedAt", nullable: true, select: false })
  archivedAt: Date | null;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
