import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(message)
    private messRepository: Repository<message>,
  ) {}

  getAllMessages() {
    return this.messRepository.find();
  }

  getMessageByID(id: number) {
    return this.messRepository.findOneBy({ id });
  }

  createMessage(createMessageDto: CreateMessageDto) {
    return this.messRepository.create(createMessageDto);
  }

  updateMessageByID(id: number, upData: UpdateMessageDto) {
    return this.messRepository.update(id, upData);
  }

  deleteMessageByID(id: number) {
    this.messRepository.delete(id);
  }
}
