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

  // Pour retourner un tableau
  getAllMessages(): Promise<message[]> {
    return this.messRepository.find();
  }

  // Pour retourner une valeur seule.
  getMessageByID(id: number): Promise<message> {
    return this.messRepository.findOneBy({ id });
  }

  // Crée le message
  createMessage(createMessageDto: CreateMessageDto): message {
    return this.messRepository.create(createMessageDto);
  }

  // Met à jour le message. Attend en argument l'id et ce qu'il doit modifier.
  updateMessageByID(
    id: number,
    upData: UpdateMessageDto,
  ): Promise<UpdateResult> {
    return this.messRepository.update(id, upData);
  }

  deleteMessageByID(id: number) {
    this.messRepository.delete(id);
  }
}
