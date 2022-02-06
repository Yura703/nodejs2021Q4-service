import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNumber()
  order?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  userId: string | null;

  @IsString()
  @IsOptional()
  boardId: string | null;

  @IsString()
  @IsOptional()
  columnId: string | null;
}
