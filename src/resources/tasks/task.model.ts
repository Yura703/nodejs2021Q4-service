import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from '../boards/board.model';
import { User } from '../users/user.model';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

@Entity({ name: 'tasks' })
export class Task extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: '' })
  title!: string;

  @Column({ default: 0 })
  order!: number;

  @Column({ default: '' })
  description!: string;

  @Column({ 
    default: null, 
    nullable: true 
  })
  userId!: string | null;

  @Column({ 
    default: null, 
    nullable: true 
  })
  boardId!: string | null;

  @Column({ 
    default: null, 
    nullable: true 
  })
  columnId!: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'boardId'})
  board!: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({name: 'userId'})
  user!: string;
}
