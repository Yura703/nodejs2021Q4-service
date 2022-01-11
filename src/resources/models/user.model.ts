import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
      length: 100
  })
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;
}


