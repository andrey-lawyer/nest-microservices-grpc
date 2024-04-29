import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { DbModule } from './db.module';

import { db } from '@app/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DbModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../database.proto'),
        package: db.DATABASE_PACKAGE_NAME,
        url: 'localhost:5002',
      },
    },
  );
  await app.listen();
  logger.log('Database microservice is listening');
}
bootstrap();
