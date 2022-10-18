import { Injectable } from '@nestjs/common';
import { Mess } from './interfaces/messages.interface';

@Injectable()
export class MessagesService {
  // crée un élément privé en lecture seule.
  private readonly messages: Mess[] = [];

  // Ajoute une valeur au tableau en lecture seule.
  create(mess: Mess) {
    this.messages.push(mess);
  }

  // fonction qui retourne ici mon tableau avec les valeurs ajoutées.
  findAll(): Mess[] {
    return this.messages;
  }
}
