import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

// export class GoogleAuthGuard extends AuthGuard('google') {}
// export class NaverAuthGuard extends AuthGuard('naver') {}
// export class KakaoAuthGuard extends AuthGuard('kakao') {}

// const googleAuthGuard = new GoogleAuthGuard();
// const naverAuthGuard = new NaverAuthGuard();
// const kakaoAuthGuard = new KakaoAuthGuard();

// const DYNAMIC_AUTH_GUARD = {
//   google: new GoogleAuthGuard(),
//   naver: new NaverAuthGuard(),
//   kakao: new KakaoAuthGuard(),
// };

const DYNAMIC_AUTH_GUARD = {
  google: new (class extends AuthGuard('google') {})(),
  naver: new (class extends AuthGuard('naver') {})(),
  kakao: new (class extends AuthGuard('kakao') {})(),
};

const DYNAMIC_AUTH_GUARD_REDUCE = ['google', 'naver', 'kakao'].reduce(
  (prev, current) => {
    const result = {
      ...prev,
      [current]: new (class extends AuthGuard(current) {})(),
    };
    return result;
  },
  {},
);

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    return DYNAMIC_AUTH_GUARD_REDUCE[social].canActivate(context);
    // if (social === 'google') {
    //   return googleAuthGuard.canActivate(context);
    // }
    // if (social === 'naver') {
    //   return naverAuthGuard.canActivate(context);
    // }
    // if (social === 'kakao') {
    //   return kakaoAuthGuard.canActivate(context);
    // }
  }
}
