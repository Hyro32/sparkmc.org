import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  username: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  password: string;

  @IsString()
  githubId?: string;

  @IsString()
  discordId?: string;
}
