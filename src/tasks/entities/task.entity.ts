import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  id: string;

  @Column({ default: '' })
  title: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: '' })
  description: string;

  @Column('uuid', { nullable: true })
  userId: string | null;
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user?: User | undefined;

  @Column('uuid')
  boardId!: string;
  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  board!: Board | undefined;

  @Column('varchar', { nullable: true })
  columnId: string | null;
}
