import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, User } from 'src/entities';
import { In, Repository } from 'typeorm';
import { CreateMessageDTO } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private db: Repository<Message>,
    @InjectRepository(User)
    private db2: Repository<User>,
  ) {}
  async getAllmessages(userID: number) {
    const user = await this.db2.findOneBy({ id: userID });
    const messages = await this.db.findBy({ author: user.username });
    return messages;
    // if (!messages.includes(Message[userID])) {
    //   throw new HttpException(
    //     {
    //       statut: HttpStatus.UNAUTHORIZED,
    //       message: "Vous n'êtes pas l'auteur de ce message",
    //     },
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

    // if (messages.length === 0) {
    //   return 'Liste de messages vide;';
    // }
  }

  getMessageByID(userID: number, messageID: number) {
    return 'It should get one message';
  }

  async createMessage(userID: number, dto: CreateMessageDTO) {
    const user = await this.db2.findOneBy({ id: userID });
    const message = await this.db.create({
      content: dto.content,
      author: user.username,
    });
    return this.db.save(message);
  }
  editMessageByID(userID: number) {
    return 'It should update one message';
  }

  deleteMessageByID(userID: number) {
    return 'It should delete one message';
  }
}
