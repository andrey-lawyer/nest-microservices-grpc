import { NestFactory } from '@nestjs/core';
import { auth2Module } from './auth2.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { auth2_PACKAGE_NAME } from '@app/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    auth2Module,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../auth2.proto'),
        package: auth2_PACKAGE_NAME,
        url: 'localhost:5001',
      },
    },
  );
  await app.listen();
  logger.log('auth2 microservice is listening');
}
bootstrap();
