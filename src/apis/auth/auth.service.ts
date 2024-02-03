import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthLoginInput, AuthLoginOutput } from './dto/auth-login.dto';
import {
  IAuthServiceCreateToken,
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceLoginOAuth,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthServiceSignIn,
  IAuthServiceSignOut,
  IAuthServiceSignUp,
  IAuthServiceUpdateToken,
} from './interfaces/auth-service.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IContext } from '../commons/interfaces/context';
import { AuthSignUpInput, AuthSignUpOutput } from './dto/signup-dto';
import { ConfigService } from '@nestjs/config';
import { AuthSignInInput, AuthSignInOutput } from './dto/signin-dto';
import { AuthSignOutInput, AuthSignOutOutput } from './dto/signout-dto';
import { ok } from 'assert';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(
    authLoginInput: AuthLoginInput,
    context: IContext,
  ): Promise<AuthLoginOutput> {
    const { email, password } = authLoginInput;
    const user = await this.usersService.findOneByEmail({
      email,
    });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    await this.setRefreshToken({ user, res: context.res });
    const accessToken = await this.getAccessToken({ user });
    return {
      ok: true,
      accessToken,
    };
  }

  async signup(authSignUpInput: AuthSignUpInput): Promise<AuthSignUpOutput> {
    const { email, password, name } = authSignUpInput;
    const existenceUser = await this.usersService.findOneByEmail({
      email,
    });
    if (existenceUser) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
      },
    });
    const { accessToken, refreshToken } = await this.createTokens({ user });
    await this.updateRefreshToken({ user, refreshToken });
    return {
      accessToken,
      refreshToken,
      user,
      ok: true,
    };
  }

  async signIn(authSignInInput: AuthSignInInput): Promise<AuthSignInOutput> {
    const { email, password } = authSignInInput;
    const user = await this.usersService.findOneByEmail({
      email,
    });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다');
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    const { accessToken, refreshToken } = await this.createTokens({ user });
    await this.updateRefreshToken({ user, refreshToken });
    return {
      ok: true,
      accessToken,
      refreshToken,
      user,
    };
  }

  async signOut(
    authSignOutInput: AuthSignOutInput,
  ): Promise<AuthSignOutOutput> {
    const { id } = authSignOutInput;
    await this.prisma.user.updateMany({
      where: { id, refreshToken: { not: null } },
      data: { refreshToken: null },
    });
    return {
      loggedOut: true,
      ok: true,
    };
  }

  async restoreAccessToken({
    user,
  }: IAuthServiceRestoreAccessToken): Promise<string> {
    return this.getAccessToken({ user });
  }

  async getAccessToken({ user }: IAuthServiceGetAccessToken) {
    const accessToken = await this.jwtService.sign(
      { sub: user.id },
      { secret: 'star', expiresIn: '1h' },
    );
    return accessToken;
  }
  async setRefreshToken({ user, res }: IAuthServiceSetRefreshToken) {
    const refreshToken = await this.jwtService.sign(
      { sub: user.id },
      { secret: 'coex', expiresIn: '4h' },
    );
    res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    // 배포환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path:/; domain=.http://localhost:3100; SameSite=None; Secure; httpPOnly`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'http://localhost:3100',
    // );
  }

  async createTokens({ user }: IAuthServiceCreateToken) {
    const accessToken = this.jwtService.sign(
      { sub: user.id },
      {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: '1h',
      },
    );
    const refreshToken = this.jwtService.sign(
      { sub: user.id, accessToken },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '2w',
      },
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken({ user, refreshToken }: IAuthServiceUpdateToken) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async getRefreshToken({
    userId,
    refreshToken: _refreshToken,
  }: {
    userId: string;
    refreshToken: string;
  }) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ConflictException('접근이 불가합니다. ');
    }
    const doRefreshTokensMatch = await bcrypt.compare(
      user.refreshToken,
      _refreshToken,
    );
    if (!doRefreshTokensMatch) {
      throw new ConflictException('접근이 불가합니다. ');
    }
    const { accessToken, refreshToken } = await this.createTokens({ user });
    await this.updateRefreshToken({ user, refreshToken });
    return { accessToken, refreshToken, user };
  }

  async loginOAuth({ req, res }: IAuthServiceLoginOAuth) {
    let user: User;
    const { email, password, name } = req.user;
    user = await this.usersService.findOneByEmail({
      email,
    });
    if (!user) {
      user = await this.usersService.create({
        email,
        password,
        name,
      });
    }

    await this.setRefreshToken({ user, res });
    res.redirect(`http://localhost:5502/social-login.html`);
  }

  // async loginOAuth({ req, res }: IAuthServiceLoginOAuth) {
  //   const { email, password, name } = req.user;
  //   console.log(email, password, name);
  //   let user = await this.usersService.findOneByEmail({
  //     email,
  //   });
  //   if (!user) {
  //     user = await this.usersService.create(cre);
  //   }

  //   await this.setRefreshToken({ user, res });
  //   res.redirect(`http://localhost:5500/social-login.html`);
  // }
}
