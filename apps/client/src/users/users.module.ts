import { Module } from '@nestjs/common';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { auth2_PACKAGE_NAME } from '@app/common';
import { auth2_SERVICE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: auth2_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5001',
          package: auth2_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth2.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
