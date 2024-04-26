import {
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof UnauthorizedException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      response.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
      });
    } else {
      this.logger.error(exception);
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
