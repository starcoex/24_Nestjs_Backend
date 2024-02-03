import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('SOCIAL_LOGIN_KAKAO_CLIENT_ID'),
      clientSecret: configService.get('SOCIAL_LOGIN_KAKAO_CLIENT_SECRET_KEY'),
      callbackURL: 'http://localhost:3100/auth/kakao',
      scope: ['profile_nickname	', 'profile_image'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      name: profile.displayName,
      email: 'kakao1@daum.net',
      password: 'password',
    };
  }
}
