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
    let passError, emailError;
    if (dto.password !== dto.passBis)
      passError = 'Veuillez saisir le même mot de passe.';

    if (email) emailError = 'Email déjà utilisé';

    if (emailError || passError) {
      const errors = {
        status: HttpStatus.PRECONDITION_FAILED,
        message: {
          emailError: emailError,
          passError: passError,
        },
      };
      return errors;
    }

    const hash = await argon.hash(dto.password);

    user.email = dto.email;
    user.username = dto.username;
    user.password = hash;

    this.db.save(user);
    return {
      status: 201,
      data: { email: user.email, username: user.username },
    };
  }
  async connexion(username: string, pass: string) {
    const user = await this.db.findOneBy({ username: username });

    //TODO : add errors variables.
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
