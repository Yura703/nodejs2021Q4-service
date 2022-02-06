import { Module } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (_req, file, cb) => {
          cb(null, './static');
        },
        filename: (_req, file, cb) => {
          const { originalname } = file;
          cb(null, originalname);
        },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
