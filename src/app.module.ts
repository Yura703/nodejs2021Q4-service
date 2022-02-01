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
//import { DBModule } from './db.module';

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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'pass',
      database: 'test',
      entities: [User, Task, Board],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
