import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
      length: 100,
      default: 'USER'
  })
  name!: string;

  @Column({
    default: 'user'
  })
  login!: string;

  @Column({
    default: 'P@55w0rd',
    select: false
  })
  password!: string;
}


