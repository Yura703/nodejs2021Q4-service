import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Board } from './boards/entities/board.entity';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    BoardsModule,
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Task, Board],
      synchronize: false,
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
