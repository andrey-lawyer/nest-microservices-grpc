import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
// import { RpcExceptionFilter } from './filter/rpcExceptionFilter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen(3000);
  logger.log('Client is listening on port 3000');
}
bootstrap();
