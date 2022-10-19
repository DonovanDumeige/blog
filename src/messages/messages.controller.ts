import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
// import { Mess } from './interfaces/messages.interface';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post()
  // Récupère la fonction créer dans messageService, avec comme données le format (dto) donné.
  create(@Body() createMessageDto: CreateMessageDto) {
    console.log(createMessageDto);
    return this.messageService.createMessage(createMessageDto);
  }
  @Get()  
  findAll() {
    //: Promise<Mess[]> // --> Je ne comprends pas pourquoi cela retourne une erreur pour l'instant.
    return this.messageService.getAllMessages();
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This actions return a #{params.id} message`;
  }
}
