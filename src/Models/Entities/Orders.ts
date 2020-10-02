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
@Entity("orders", { schema: "heroku_42df861642a2ede" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "userId" })
  userId: number;

  @Column("int", { name: "productId", nullable: true })
  productId: number | null;

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

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Product, (product) => product.orders, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
