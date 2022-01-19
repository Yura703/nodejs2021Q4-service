import { ConnectionOptions } from 'typeorm';
import { User } from './src/resources/users/user.model';
import dotenv from 'dotenv';
import path from 'path';
import { Board } from './src/resources/boards/board.model';
import { Task } from './src/resources/tasks/task.model';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const connectionOptions: ConnectionOptions = {
  //name: 'postg',
  type: 'postgres',
  host: 'postgres',
  port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  entities: [User, Board, Task],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations'
  }
}

export default connectionOptions;