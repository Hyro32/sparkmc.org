import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Resource } from 'src/resources/entities/resource.entity';

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

  @IsString()
  @IsOptional()
  likes?: Resource[];

  @IsString()
  @IsOptional()
  githubId?: string;

  @IsString()
  @IsOptional()
  discordId?: string;
}
