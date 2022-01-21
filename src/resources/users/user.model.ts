import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { 
    default: 'USER' 
  })
  name!: string;

  @Column('varchar', { 
    default: 'user' 
  })
  login!: string;

  @Column('varchar', { 
    default: 'P@55w0rd', 
    select: false 
  })
  password!: string;
}

export type UserDto = Omit<IUser, 'password'>;
