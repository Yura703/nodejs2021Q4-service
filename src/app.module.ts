import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import ormConfig from '../ormConfig';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Board } from './boards/entities/board.entity';
//import { DBModule } from './db.module';
//import { AuthModule } from './auth/auth.module';
import { LoginModule } from './login/login.module';
//import { join } from 'path';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    BoardsModule,
    FilesModule,
    //DBModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), //добавить все модули
    // TypeOrmModule.forRoot({
    //   ...ormConfig,
    //   autoLoadEntities: true,
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5434,
    //   username: 'postgres',
    //   password: 'pass',
    //   database: 'test',
    //   entities: [User, Task, Board],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      //entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      entities: [User, Task, Board],
      synchronize: false,
      migrations: ['dist/src/migrations/*{.ts,.js}'],
      migrationsRun: true,
      // cli: {
      //   migrationsDir: 'src/migrations',
      // },

      //"entities": ["dist/**/*.entity{ .ts,.js}"],

      //migrations: ['dist/migrations/*{.ts,.js}'],
      //migrationsTableName: 'migrations_typeorm',
      //migrationsRun: true,
    }),
    //AuthModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
