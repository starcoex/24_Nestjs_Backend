import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { AxiosError } from 'axios';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    const error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '예외가 발생했어요!',
    };

    if (exception instanceof HttpException) {
      error.status = exception.getStatus();
      error.message = exception.message;
    } else if (exception instanceof AxiosError) {
      error.status = exception.response.status;
      error.message = exception.response.data.message;
    }
    throw new ApolloError(error.message, error.status.toString());
  }
}
