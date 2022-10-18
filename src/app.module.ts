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
import { DataSource } from 'typeorm';
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
      entities: ['dist/src/**/*.entity.js'],
      synchronize: true, //true en dev, false en prod
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

/* 
J'ai un problème pour gérer les migrations. 
Si je fais npm run typeorm migration:create 'src/db/migrations/nomMigration, cela fonctionne.
Je ne peux pas faire migration:run et donc envoyer la table créé en BDD...
Idem, je ne peux pas faire migration:generate.

A chaque fois que j'essaie, cela m'indique DataSource manquante.
Hors ce qu'il y a dans TypeOrmModule est la DataSource ! Vraiment je ne comprends pas.

Si tu as une piste, je suis pour. Je cherche après des solutions.
*/
