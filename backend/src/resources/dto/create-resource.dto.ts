import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  url: string;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsString()
  icon: string;

  @IsNumber()
  @IsOptional()
  downloads: number;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;
}
