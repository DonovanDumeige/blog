import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagesModule,
    AuthModule,
  ],
})
export class AppModule {}

/* 
J'ai un problème pour gérer les migrations. 
Si je fais npm run typeorm migration:create 'src/db/migrations/nomMigration, cela fonctionne.
Je ne peux pas faire migration:run et donc envoyer la table créé en BDD...
Idem, je ne peux pas faire migration:generate.

A chaque fois que j'essaie, cela m'indique DataSource manquante.
Hors ce qu'il y a dans TypeOrmModule est la DataSource ! Vraiment je ne comprends pas.

Si tu as une piste, je suis pour. Je cherche après des solutions.
*/
