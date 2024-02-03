import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('SOCIAL_LOGIN_NAVER_CLIENT_ID'),
      clientSecret: configService.get('SOCIAL_LOGIN_NAVER_CLIENT_SECRET_KEY'),
      callbackURL: 'http://localhost:3100/auth/naver',
      scope: ['email', 'name', 'age', 'birthday', 'profile_image'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      name: profile.name,
      email: profile.email,
      password: 'password',
    };
  }
}
