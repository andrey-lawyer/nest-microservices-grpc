import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

import { DB_SERVICE } from './constants';
import { db } from '@app/common';

import { AllExceptionsFilter } from './filters/rpc-exception.filter';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: DB_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5002',
          package: db.DATABASE_PACKAGE_NAME,
          protoPath: join(__dirname, '../database.proto'),
        },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class PostsModule {}
