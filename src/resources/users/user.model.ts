//import { v4 as uuidv4 } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
//import { Task } from '../tasks/task.model';

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

  // @OneToMany(() => Task, (task) => task.id)
  // tasks!: string;
}

export type UserDto = Omit<IUser, 'password'>;
