import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('SOCIAL_LOGIN_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('SOCIAL_LOGIN_GOOGLE_SECRET_KEY'),
      callbackURL: 'http://localhost:3100/auth/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken, refreshToken, profile) {
    return {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos[0].value,
      password: 'password',
    };
  }
}
