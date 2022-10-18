import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MessagesController, UsersController],
  providers: [MessagesService],
  imports: [
    MessagesModule,
    // Permet de gerer une connection à la database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadEntities: true, //Ajoute automatiquement les nouvelles entités à notre BDD.
      synchronize: true,
    }),
  ],
})
export class AppModule {}
