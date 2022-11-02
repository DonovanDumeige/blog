import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateMessageDTO } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messRepo: Repository<Message>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async getAllmessages(userID: number) {
    const user = await this.userRepo.findOneBy({ id: userID });
    const messages = await this.messRepo.findBy({ author: user.username });
    return messages;
  }

  getMessageByID(userID: number, messageID: number) {
    return 'It should get one message';
  }

  async createMessage(userID: number, dto: CreateMessageDTO) {
    const user = await this.userRepo.findOneBy({ id: userID });
    const message = this.messRepo.create({
      author: user.username,
      ...dto,
    });
    return this.messRepo.save(message);
  }
  editMessageByID(userID: number) {
    return 'It should update one message';
  }

  deleteMessageByID(userID: number) {
    return 'It should delete one message';
  }
}
