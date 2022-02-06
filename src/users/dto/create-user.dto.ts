import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  login: string;

  @IsOptional()
  @IsString()
  password: string;
}
