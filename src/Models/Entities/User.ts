import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Orders } from "./Orders";

@Entity("user", { schema: "heroku_42df861642a2ede" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "firstName", length: 20 })
  firstName: string;

  @Column("varchar", { name: "lastName", length: 30 })
  lastName: string;

  @Column("varchar", { name: "email", length: 50 })
  email: string;

  @Column("smallint", { name: "role", nullable: true, default: () => "'0'" })
  role: number | null;

  @Column("varchar", { name: "address", nullable: true, length: 100 })
  address: string | null;

  @Column("varchar", { name: "telephoneNumber", nullable: true, length: 100 })
  telephoneNumber: string | null;

  @Column("varchar", { name: "password", length: 100 })
  password: string;

  @Column("varchar", { name: "refreshToken", nullable: true, length: 300 })
  refreshToken: string | null;

  @Column("datetime", { name: "createdAt" })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("varchar", { name: "archivedAt", nullable: true, length: 30 })
  archivedAt: string | null;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];
}
