import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
