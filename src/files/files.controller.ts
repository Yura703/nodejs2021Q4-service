import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  getFile(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json')); //package.json заменить на нужный файл
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }
}
