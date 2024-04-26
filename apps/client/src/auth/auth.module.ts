import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { auth } from '@app/common';
import { auth_SERVICE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: auth_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5005',
          package: auth.AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
