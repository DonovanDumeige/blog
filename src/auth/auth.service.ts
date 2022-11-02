import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository, TypeORMError } from 'typeorm';
import { CreateUserDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private db: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
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

  async signToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: secret,
    });
    return {
      acces_token: token,
    };
  }
}
