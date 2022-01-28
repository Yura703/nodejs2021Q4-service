import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { LoginsModule } from './logins/logins.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [TasksModule, UsersModule, BoardsModule, LoginsModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
