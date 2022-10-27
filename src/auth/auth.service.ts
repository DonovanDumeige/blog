import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository, TypeORMError } from 'typeorm';
import { CreateUserDTO } from './dto';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private db: Repository<User>,
  ) {}
  async inscription(dto: CreateUserDTO) {
    const user = new User();
    const email = await this.db.findOneBy({ email: dto.email });
    if (dto.password !== dto.passBis) {
      throw new HttpException(
        {
          statut: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Veuillez saisir le même mot de passe',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (email) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Email déjà utilisé',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const hash = await argon.hash(dto.password);

    user.email = dto.email;
    user.username = dto.username;
    user.password = hash;

    return this.db.save(user);
  }
  async connexion(username: string, pass: string) {
    const user = await this.db.findOneBy({ username: username });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Identifiant non reconnu.',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const isMatches = await argon.verify(user.password, pass);
    if (!isMatches) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Mot de passe incorrect.',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      const { password, ...result } = user;
      return result;
    }
  }
}
