import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import {
  IAuthServiceSetRefreshToken,
  IOAuthUser,
} from './interfaces/auth-service.interface';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GqlAuthGuard } from './guards/graphql-auth.guard';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { ok } from 'assert';
import { IContext } from '../commons/interfaces/context';
import { ConfigService } from '@nestjs/config';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard';
import { any } from 'joi';
import { PrismaService } from 'nestjs-prisma';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  hello() {
    return 'Hello';
  }

  @Get('login')
  async login(@Res({ passthrough: true }) res: Response) {
    const payload = { id: 1 };
    res.cookie('refreshToken', this.jwtService.sign(payload), {
      expires: new Date(Date.now() + 360000),
    });
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('refreshToken', '', { expires: new Date(Date.now()) });
    return {};
  }

  @UseGuards(DynamicAuthGuard)
  @Get('/:social')
  async loginOAuth(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.loginOAuth({ req, res });
  }

  // @UseGuards(AuthGuard('google'))
  // @Get('google')
  // async socialGoogleLogin(
  //   @Req() req: Request & IOAuthUser,
  //   @Res() res: Response,
  // ) {
  //   let user = await this.usersService.findOne({
  //     email: req.user.email,
  //   });
  //   if (!user) {
  //     user = await this.prisma.user.create({
  //       data: {
  //         email: req.user.email,
  //         password: req.user.password,
  //         name: req.user.name,
  //       },
  //     });
  //   }
  //   await this.authService.setRefreshToken({
  //     user,
  //     res,
  //   });
  //   res.redirect('http://localhost:5502/social-login.html');
  // }

  // @UseGuards(AuthGuard('naver'))
  // @Get('naver')
  // async socialNaverLogin(
  //   @Req() req: Request & IOAuthUser,
  //   @Res() res: Response,
  // ) {
  //   let user = await this.usersService.findOne({
  //     findOneUserInput: { email: req.user.email },
  //   });
  //   if (!user) {
  //     user = await this.usersService.create({
  //       createUserInput: {
  //         email: req.user.email,
  //         password: req.user.password,
  //         name: req.user.name,
  //       },
  //     });
  //   }
  //   await this.authService.setRefreshToken({
  //     user,
  //     res,
  //   });
  //   res.redirect('http://localhost:5500/social-login.html');
  // }

  // @UseGuards(AuthGuard('kakao'))
  // @Get('kakao')
  // async socialKakaoLogin(
  //   @Req() req: Request & IOAuthUser,
  //   @Res() res: Response,
  // ) {
  //   const { email, password, name } = req.user;
  //   let user = await this.usersService.findOneByEmail({
  //     email,
  //   });
  //   if (!user) {
  //     user = await this.usersService.create({
  //       email,
  //       password,
  //       name,
  //     });
  //   }
  //   await this.authService.setRefreshToken({
  //     user,
  //     res,
  //   });
  //   res.redirect('http://localhost:5502/social-login.html');
  // }
}
