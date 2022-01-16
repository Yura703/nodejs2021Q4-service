import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

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
}
