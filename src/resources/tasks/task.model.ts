import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
export class Task {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: '' })
  title!: string;

  @Column({ default: 0 })
  order!: number;

  @Column({ default: '' })
  description!: string;

  // @Column({ 
  //   default: null, 
  //   nullable: true 
  // })
  // userId?: string | null;

  // @Column({ 
  //   default: null, 
  //   nullable: true 
  // })
  // boardId?: string | null;

  @Column('varchar', { nullable: true })
  columnId?: string | null;

  @ManyToOne(() => Board, (board) => board.id, {  nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({name: 'boardId'})
  boardId?: string| null = null;

  @ManyToOne(() => User, (user) => user.id, {  nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({name: 'userId'})
  userId?: string | null = null;
}
