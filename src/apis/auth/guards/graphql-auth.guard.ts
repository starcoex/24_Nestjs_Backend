import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphQlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req;
  }
}

@Injectable()
export class GraphqlAuthRefreshGuard extends AuthGuard('refresh') {
  getRequest(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req;
  }
}

export const GqlAuthGuard = (name: string) => {
  return class GraphQlAuthGuard extends AuthGuard(name) {
    getRequest(context: ExecutionContext) {
      const graphqlContext = GqlExecutionContext.create(context);
      return graphqlContext.getContext().req;
    }
  };
};
