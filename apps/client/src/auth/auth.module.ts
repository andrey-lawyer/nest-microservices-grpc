import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { auth } from '@app/common';
import { auth_SERVICE } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';

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
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
