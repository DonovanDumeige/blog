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

  /* Method for registrer an user.
  Create an user with his data (email, username, password) 
  only if the email is not found on the database.

  If the password is correct, it is encrypted for better security.
  If there is no error, the data is send to the database. */
  async inscription(dto: CreateUserDTO) {
    const email = await this.db.findOneBy({ email: dto.email });
    let passError, emailError;
    if (dto.password !== dto.passBis)
      passError = 'Please enter the same password.';

    const hash = await argon.hash(dto.password);

    if (email) emailError = 'Email already use.';

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

    const user = this.db.create({ password: hash, ...dto });
    this.db.save(user);
    return {
      status: 201,
      data: { email: user.email, username: user.username },
    };
  }

  /* 
  Method to connect an user.
  Verify if the username, and the password are found on the database.
  Otherwise, connection is denied.
  */
  async connexion(username: string, pass: string) {
    const user = await this.db.findOneBy({ username: username });
    let userError, passError;
    //TODO : add errors variables.
    if (!user) {
      userError = 'ID not recognized';
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
      passError = 'Invalid password.';
    }

    if (userError || passError) {
      const errors = {
        status: HttpStatus.PRECONDITION_FAILED,
        message: {
          user: userError,
          password: passError,
        },
      };
      return errors;
    }

    const { password, ...result } = user;
    return result;
  }

  /* Method to create a JWT token. The payload includes the user's information. It is
  the used to create the token. */
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
