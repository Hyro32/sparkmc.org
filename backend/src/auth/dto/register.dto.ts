import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
