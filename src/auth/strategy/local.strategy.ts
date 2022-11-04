import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthDTO, CreateUserDTO } from '../dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /* method for approve the connection of the user. It includes user's information.
  If this information is recognized, the connection is authorized. 
  Otherwise, access is denied.
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.connexion(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
