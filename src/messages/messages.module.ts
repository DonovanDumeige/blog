// Un module permet de regrouper des composants (controller, services, interfaces...)
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([message])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService, TypeOrmModule], // ce qui est exporté avec le module. MessageService sera donc accessible
  //dès l'import de notre module.
})
export class MessagesModule {}
