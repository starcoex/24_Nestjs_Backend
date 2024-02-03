import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthLoginInput, AuthLoginOutput } from './dto/auth-login.dto';
import { IContext } from '../commons/interfaces/context';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthRefreshGuard } from './guards/graphql-auth.guard';
import { AuthSignUpInput, AuthSignUpOutput } from './dto/signup-dto';
import { AuthSignInInput, AuthSignInOutput } from './dto/signin-dto';
import { AuthSignOutInput, AuthSignOutOutput } from './dto/signout-dto';
import { Public } from './decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthLoginOutput)
  login(
    @Context() context: IContext,
    @Args('input') authLoginInput: AuthLoginInput,
  ): Promise<AuthLoginOutput> {
    return this.authService.login(authLoginInput, context);
  }

  @Public()
  @Mutation(() => AuthSignUpOutput)
  signup(
    @Args('input') authSignUpInput: AuthSignUpInput,
  ): Promise<AuthLoginOutput> {
    return this.authService.signup(authSignUpInput);
  }

  @Public()
  @Mutation(() => AuthSignInOutput)
  signIn(
    @Args('input') authSignInInput: AuthSignInInput,
  ): Promise<AuthSignInOutput> {
    return this.authService.signIn(authSignInInput);
  }

  @Mutation(() => AuthSignOutOutput)
  signOut(
    @Args('input') authSignOutInput: AuthSignOutInput,
  ): Promise<AuthSignOutOutput> {
    return this.authService.signOut(authSignOutInput);
  }

  @UseGuards(GraphqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@Context() context: IContext): Promise<string> {
    return this.authService.restoreAccessToken({ user: context.req.user });
  }

  // @Public()
  // @UseGuards(RefreshTokenGuard)
  // @Mutation(() => NewTokensOutput)
  // getNewTokens(
  //   @CurrentUserId() userId: string,
  //   @CurrentUser('refreshToken') refreshToken: string,
  // ) {
  //   return this.authService.getRefreshToken({ userId, refreshToken });
  // }

  // @Public()
  // @Query(() => String)
  // hello() {
  //   return 'Je;;p';
  // }
}
