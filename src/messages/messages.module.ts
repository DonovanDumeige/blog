// Un module permet de regrouper des composants (controller, services, interfaces...)
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService], // ce qui est exporté avec le module. MessageService sera donc accessible
  //dès l'import de notre module.
})
export class MessagesModule {}
