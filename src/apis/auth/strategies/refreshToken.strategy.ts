import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthServiceJwtPayload } from '../interfaces/auth-service.interface';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(public configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, { payload }: IAuthServiceJwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer ', '').trim();

    console.log(payload, refreshToken);
    return { id: payload.sub, refreshToken };
  }
}
