import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Index("userId", ["userId"], {})
@Index("productId", ["productId"], {})
@Entity("cart", { schema: "heroku_42df861642a2ede" })
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("int", { name: "productId" })
  productId: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("float", { name: "totalPrice", precision: 12 })
  totalPrice: number;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("varchar", { name: "archivedAt", nullable: true, length: 30 })
  archivedAt: string | null;

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Product, (product) => product.carts, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => Product, (product) => product.carts2, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product2: Product;
}
