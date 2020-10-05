import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Category } from "./Category";

@Index("categoryId", ["categoryId"], {})
@Entity("product", { schema: "heroku_42df861642a2ede" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "heading", length: 100 })
  heading: string;

  @Column("text", { name: "subheading", nullable: true })
  subheading: string | null;

  @Column("int", { name: "categoryId" })
  categoryId: number;

  @Column("varchar", { name: "image", nullable: true, length: 200 })
  image: string | null;

  @Column("text", { name: "description" })
  description: string;

  @Column("text", { name: "fullDescription", nullable: true })
  fullDescription: string | null;

  @Column("float", { name: "price", precision: 12 })
  price: number;

  @Column("float", { name: "secondPrice", nullable: true, default: null, precision: 12 })
  secondPrice: number | null;

  @Column("boolean", { name: "isRecommended", default: false })
  isRecommended: number;

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

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;
}
