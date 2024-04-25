import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
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
          package: db.DB_PACKAGE_NAME,
          protoPath: join(__dirname, '../db.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
