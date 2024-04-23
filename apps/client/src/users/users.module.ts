import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { AUTH_SERVICE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
