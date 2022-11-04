import { IsOptional, IsString } from 'class-validator';

export class EditMessageDTO {
  @IsString()
  @IsOptional()
  content: string;
}
