import { ConnectionOptions } from 'typeorm';
import { User } from './resources/users/user.model';
import dotenv from 'dotenv';
import path from 'path';
import { Board } from './resources/boards/board.model';
import { Task } from './resources/tasks/task.model';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  entities: [User, Board, Task],
  synchronize: false,
  dropSchema: false,
  migrations: ['./src/migrations/**/*.ts'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations'
  }
}

export default connectionOptions;