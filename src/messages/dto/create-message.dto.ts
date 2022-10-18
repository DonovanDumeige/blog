/* eslint-disable prettier/prettier */

// Le DTO sert de modèle pour l'envoie des données.
// C'est un objet de transfert où l'on insère les données dont on a besoin.
export class CreateMessageDto {
  author: string;
  content: string;
}
