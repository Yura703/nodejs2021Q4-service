import { ConnectionOptions } from 'typeorm';
import { CONFIG } from './config';
import { UserModel } from '../resources/user.model';
import { BoardModel } from '../board.model';
import { ColumnModel } from '../resources/boards/column.model';
import { TaskModel } from '../resources/tasks/task.model';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST
} = CONFIG;

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: false,
  entities: [UserModel, BoardModel, ColumnModel, TaskModel],
  synchronize: false,
  dropSchema: false,
  migrations: ['./src/migrations/**/*.ts'],
  migrationsRun: false,
  cli: {
    migrationsDir: 'src/migrations'
  }
}

export default connectionOptions

