import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("category", { schema: "heroku_42df861642a2ede" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "categoryName", length: 50 })
  categoryName: string;

  @Column("datetime", { name: "createdAt", select: false })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
    select: false,
  })
  modifiedAt: Date | null;

  @Column("date", { name: "archivedAt", nullable: true, select: false })
  archivedAt: string | null;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
