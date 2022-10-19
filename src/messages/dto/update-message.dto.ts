import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { Length, MaxLength } from 'class-validator';
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @Length(2, 20)
  author: string;

  @MaxLength(500)
  content: string;
}
