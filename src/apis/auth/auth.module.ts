import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { JwtGoogleStrategy } from './strategies/jwt-social-google.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtNaverStrategy } from './strategies/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from './strategies/jwt-social-kakao.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule,
    // PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // JwtModule.register({ secret: 'star', signOptions: { expiresIn: '1h' } }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
