import {
  Controller,
  Get,
  Post,
  StreamableFile,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return this.filesService.uploadFile(file.filename);
  }

  @Get(':name')
  getFile(@Param('name') name: string): StreamableFile {
    const file = this.filesService.findOne(name);

    return file;
  }
}
