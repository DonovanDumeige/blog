import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateMessageDTO, EditMessageDTO } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messRepo: Repository<Message>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async getAllmessages() {
    return this.messRepo.find();
  }

  async getMessageByID(messageID: number) {
    const message = await this.messRepo.findOneBy({
      id: messageID,
    });
    if (!message)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'message not found' },
        HttpStatus.NOT_FOUND,
      );
    return message;
  }

  async createMessage(userID: number, dto: CreateMessageDTO) {
    const user = await this.userRepo.findOneBy({ id: userID });
    const message = this.messRepo.create({
      author: user.username,
      userId: userID,
      ...dto,
    });
    return this.messRepo.save(message);
  }
  async editMessageByID(
    userID: number,
    messageID: number,
    dto: EditMessageDTO,
  ) {
    let messError;

    const message = await this.messRepo.findOne({
      where: {
        id: messageID,
        userId: userID,
      },
    });

    if (!message || message === null) {
      messError = {
        status: HttpStatus.NOT_FOUND,
        message: 'Message not found or null',
      };
      return messError;
    }

    return this.messRepo.save({
      ...message,
      ...dto,
    });
  }

  async deleteMessageByID(userID: number, messageID: number) {
    const message = await this.messRepo.findOneBy({
      id: messageID,
      userId: userID,
    });
    this.messRepo.remove(message);
    return `Message n°${messageID} deleted.`;
  }
}
