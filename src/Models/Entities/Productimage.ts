import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Index("image_product_id_fk", ["productId"], {})
@Entity("productimage", { schema: "heroku_42df861642a2ede" })
export class Productimage {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "productId", select: false })
  productId: number;

  @Column("varchar", { name: "image", length: 255 })
  image: string;

  @Column("timestamp", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
    select: false,
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
    select: false,
  })
  modifiedAt: Date;

  @ManyToOne(() => Product, (product) => product.productimages, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}
