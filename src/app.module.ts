import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { message } from './messages/entities/message.entity';

@Module({
  controllers: [MessagesController, UsersController, AppController],
  providers: [MessagesService, UsersService, AppService],
  imports: [
    MessagesModule,
    UsersModule,
    // Permet de gerer une connection à la database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blog_nest',
      autoLoadEntities: true, //Ajoute automatiquement les nouvelles entités à notre BDD.
      synchronize: false,
      migrations: ['migration/*.js'],
    }),
  ],
})
export class AppModule {}
