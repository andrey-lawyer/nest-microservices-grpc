import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DB_SERVICE } from './constants';
import { db } from '@app/common';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';
import { AllExceptionsFilter } from './filters/rpc-exception.filter';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET') || 'JWT_SECRET',
          signOptions: {
            expiresIn:
              config.get<string | number>('JWT_EXPIRES') || 'JWT_EXPIRES',
          },
        };
      },
    }),
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
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
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
export class AuthModule {}
