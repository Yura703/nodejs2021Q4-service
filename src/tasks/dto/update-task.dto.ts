import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  order?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  userId?: string | null;

  @IsOptional()
  boardId?: string | null;

  @IsOptional()
  columnId?: string | null;
}
