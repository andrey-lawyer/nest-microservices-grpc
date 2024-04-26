import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

// @Catch(RpcException)
// export class RpcExceptionFilter implements ExceptionFilter {
//   catch(exception: RpcException, host: ArgumentsHost) {
//     const error: any = exception.getError();
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     console.log(error);
//     console.error(response.status);
//     response.status(error).json(error);
//   }
// }

export interface IRpcException {
  message: string;
  status: number;
}

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: IRpcException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception.status
      ? exception.status
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
