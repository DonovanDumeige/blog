/* eslint-disable prettier/prettier */
import { IsNotEmpty, Length, MaxLength} from "class-validator";
// Le DTO sert de modèle pour l'envoie des données.
// C'est un objet de transfert où l'on insère les données dont on a besoin.
export class CreateMessageDto {
  @IsNotEmpty()
  @Length(2, 20)

  author: string;

  @IsNotEmpty()
  @MaxLength(500)
  content: string;
}
