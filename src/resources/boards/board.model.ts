import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.model';

export interface IColumn {
  id?: string;
  title: string;
  order: number;
}
export interface IBoard {
  id?: string;
  title: string;
  columns?: IColumn[] | [];
}

@Entity({ name: 'boards' })
export class Board extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('json')
  columns: IColumn[] = [];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}


