import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    // super({
    //   jwtFromRequest: ExtractJwt.fromExtractors([
    //     JwtRefreshStrategy.extractJWT,
    //     ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ]),
    //   ignoreExpiration: false,
    //   secretOrKey: 'coex',
    // });
    super({
      jwtFromRequest: (req) => {
        const cookies = req.headers.cookie;
        const refreshToken = cookies.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'coex',
    });
  }
  // private static extractJWT(req: RequestType): string | null {
  //   if (
  //     req.cookies &&
  //     'refreshToken' in req.cookies &&
  //     req.cookies.refreshToken.length > 0
  //   ) {
  //     return req.cookies.refreshToken;
  //   }
  //   return null;
  // }

  async validate(payload: any) {
    return { id: payload.sub };
  }
}
