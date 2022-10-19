import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesService } from './messages.service';
// import { Mess } from './interfaces/messages.interface';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post()
  // Récupère la fonction créer dans messageService, avec comme données le format (dto) donné.
  create(@Body() createMessageDto: CreateMessageDto) {
    console.log(createMessageDto);
    return this.messageService.createMessage(createMessageDto);
  }
  @Get()
  findAll() {
    return this.messageService.getAllMessages();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.getMessageByID(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() Data: UpdateMessageDto,
  ) {
    return this.messageService.updateMessageByID(+id, Data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.deleteMessageByID(id);
  }
}
