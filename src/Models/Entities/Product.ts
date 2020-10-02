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
import { Orders } from "./Orders";
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

  @Column("float", { name: "secondPrice", nullable: true, precision: 12 })
  secondPrice: number | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("varchar", { name: "archivedAt", nullable: true, length: 30 })
  archivedAt: string | null;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => Cart, (cart) => cart.product2)
  carts2: Cart[];

  @OneToMany(() => Orders, (orders) => orders.product)
  orders: Orders[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Category;
}
