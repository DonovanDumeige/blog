import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { GetUser } from 'src/decorators';
import { EditMessageDTO } from './dto';
import { CreateMessageDTO } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private MessageService: MessagesService) {}

  @Get()
  async getAllmessages(@GetUser('id') userID: number) {
    return await this.MessageService.getAllmessages(userID);
  }

  @Get(':id')
  getMessageByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) messageID: number,
  ) {
    console.log(messageID, userID);
    return this.MessageService.getMessageByID(messageID, userID);
  }

  @Post()
  createMessage(@GetUser('id') userID: number, @Body() dto: CreateMessageDTO) {
    return this.MessageService.createMessage(userID, dto);
  }

  @Patch(':id')
  editMessageByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) messageID: number,
    @Body() dto: EditMessageDTO,
  ) {
    return this.MessageService.editMessageByID(userID, messageID, dto);
  }

  @Delete(':id')
  deleteMessageByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) messageID: number,
  ) {
    return this.MessageService.deleteMessageByID(userID, messageID);
  }
}
