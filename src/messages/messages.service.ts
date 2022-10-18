import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(message)
    private messRepository: Repository<message>,
  ) {}

  // Pour retourner un tableau
  getAllMessages(): Promise<message[]> {
    return this.messRepository.find();
  }

  // Pour retourner une valeur seule.
  getMessageByID(id: number): Promise<message> {
    return this.messRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.messRepository.delete(id);
  }

  create(createMessageDto: CreateMessageDto) {
    return this.messRepository.create(createMessageDto);
  }
}
