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
  async getAllmessages(userID: number) {
    return this.messRepo.find({
      where: {
        userId: userID,
      },
    });
  }

  async getMessageByID(messageID: number, userID: number) {
    const message = await this.messRepo.findOneBy({
      id: messageID,
      userId: userID,
    });
    if (!message)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'message not found' },
        HttpStatus.NOT_FOUND,
      );

    if (message.userId != userID)
      throw new HttpException(
        { status: HttpStatus.UNAUTHORIZED, message: 'access unauthorized' },
        HttpStatus.UNAUTHORIZED,
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
    const message = await this.messRepo.findOneBy({
      id: messageID,
      userId: userID,
    });

    //TODO: add tests to check if there is a message and if the user ID is recognized.
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
