import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  @IsNotEmpty()
  content: string;
}
