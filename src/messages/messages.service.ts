import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private db: Repository<Message>,
  ) {}
  async getAllmessages(userID: number) {
    const messages = await this.db.findBy(userID);

    if (!messages.includes(Message[userID])) {
      throw new HttpException(
        {
          statut: HttpStatus.UNAUTHORIZED,
          message: "Vous n'êtes pas l'auteur de ce message",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (messages.length === 0) {
      return 'Liste de messages vide;';
    }

    return messages;
  }

  getMessageByID(userID: number, messageID: number) {
    return 'It should get one message';
  }

  async createMessage(userID: number, dto: CreateMessageDTO) {
    const message = await new Message();
    message.content = dto.content;
    message.author = dto.author;
    message.user.id = userID;
    return this.db.save(message);
  }
  editMessageByID(userID: number) {
    return 'It should update one message';
  }

  deleteMessageByID(userID: number) {
    return 'It should delete one message';
  }
}
