import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  uploadFile(file: string) {
    return `File ${file} is upload`;
  }

  findOne(name: string): StreamableFile {
    const filePath = join(process.cwd(), './static/' + name);

    if (!fs.existsSync(filePath))
      throw new InternalServerErrorException(`File ${name} not found.`);

    const fileStream = fs.createReadStream(filePath);

    return new StreamableFile(fileStream);
  }
}
