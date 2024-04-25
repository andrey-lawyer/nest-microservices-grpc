import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DB_SERVICE } from './constants';
import { db2 } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: DB_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5002',
          package: db2.DATABASE_PACKAGE_NAME,
          protoPath: join(__dirname, '../database.proto'),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
