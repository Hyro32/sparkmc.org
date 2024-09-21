import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiVersion, ResourceType } from 'src/types/types';
import { User } from 'src/users/entities/user.entity';

export class CreateResourceDto {
  @IsString()
  url: string;

  @IsString()
  author: string;

  @IsString()
  @IsEnum(ResourceType)
  type: ResourceType;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  likes?: User[];

  @IsNumber()
  @IsOptional()
  downloads?: number;

  @IsString()
  about: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  tags: string[];

  @IsString()
  @IsEnum(ApiVersion)
  api_version: ApiVersion;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  support?: string;

  @IsString()
  @IsDateString()
  updated_at: Date;

  @IsString()
  @IsDateString()
  created_at: Date;
}
