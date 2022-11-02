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
    // return this.MessageService.getMessageByID();
  }

  @Post()
  createMessage(@GetUser('id') userID: number, @Body() dto: CreateMessageDTO) {
    return this.MessageService.createMessage(userID, dto);
  }

  @Patch(':id')
  editMessageByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) messageID: number,
  ) {
    // return this.MessageService.editMessageByID();
  }

  @Delete(':id')
  deleteMessageByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) messageID: number,
  ) {
    // return this.MessageService.deleteMessageByID();
  }
}