import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("tokens_customer_id_fk", ["identityId"], {})
@Entity("tokenlog", { schema: "heroku_42df861642a2ede" })
export class Tokenlog {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "identityId" })
  identityId: number;

  @Column("longtext", { name: "token" })
  token: string;

  @Column("int", { name: "tokenType" })
  tokenType: number;

  @Column("tinyint", { name: "isValid", width: 1 })
  isValid: boolean;

  @Column("int", { name: "duration" })
  duration: number;

  @Column("datetime", { name: "expiresAt" })
  expiresAt: Date;

  @Column("timestamp", {
    name: "modifiedAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifiedAt: Date;

  @Column("timestamp", {
    name: "createdAt",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
