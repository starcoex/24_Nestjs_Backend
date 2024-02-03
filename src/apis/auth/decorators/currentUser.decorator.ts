import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadWithRefreshToken } from '../types/types';

export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const gqlContext = GqlExecutionContext.create(context);
    const req = gqlContext.getContext().req;
    if (data) return req.user[data];

    return req.user;
  },
);
