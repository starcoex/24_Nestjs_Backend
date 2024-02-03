import { User } from 'src/apis/users/entities/user.entity';
import { AuthLoginInput } from '../dto/auth-login.dto';
import { IAuthUser, IContext } from 'src/apis/commons/interfaces/context';
import { AuthSignUpInput } from '../dto/signup-dto';
import { AuthSignInInput } from '../dto/signin-dto';
import { AuthSignOutInput } from '../dto/signout-dto';
import { Request, Response } from 'express';

export interface IAuthServiceLogin {
  authLoginInput: AuthLoginInput;
}

export interface IAuthServiceSignIn {
  authSignInInput: AuthSignInInput;
}

export interface IAuthServiceSignUp {
  authSignUpInput: AuthSignUpInput;
}

export interface IAuthServiceSignOut {
  authSignOutInput: AuthSignOutInput;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceCreateToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceUpdateToken {
  user: User | IAuthUser['user'];
  refreshToken: string;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}

export interface IAuthServiceJwtPayload {
  payload: {
    sub: User | IAuthUser['user'];
  };
}

export interface IAuthServiceJwtPayloadWithRefreshToken {
  payload: {
    sub: User | IAuthUser['user'];
  };
  refreshToken: string;
}

// export interface IOAuthUser {
//   user: {
//     name?: string;
//     email: string;
//     password: string;
//     photo?: string;
//   };
// }

export interface IOAuthUser {
  user: Omit<User, 'id'>;
}

export interface IAuthServiceLoginOAuth {
  req: Request & IOAuthUser;
  res: Response;
}
