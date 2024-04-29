import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DB_SERVICE } from './constants';
import { db } from '@app/common';
import { join } from 'path';

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
  providers: [PostsService],
})
export class PostsModule {}
