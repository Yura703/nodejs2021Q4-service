import { IColumn } from '../entities/board.entity';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class BoardDto {
  @IsString()
  title?: string;

  @IsArray()
  @IsOptional()
  columns?: IColumn[];
}
