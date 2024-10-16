import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  username: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase().trim())
  password?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
