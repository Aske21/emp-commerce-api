import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("category", { schema: "heroku_42df861642a2ede" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "categoryName", length: 50 })
  categoryName: string;

  @Column("timestamp", { name: "createdAt", default: () => "CURRENT_TIMESTAMP", select: false })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    select: false,
  })
  modifiedAt: Date;

  @Column("date", { name: "archivedAt", nullable: true, select: false })
  archivedAt: string | null;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
