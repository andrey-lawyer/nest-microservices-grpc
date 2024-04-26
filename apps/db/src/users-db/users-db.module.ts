import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersDbService } from './users-db.service';
import { UsersDbController } from './users-db.controller';

import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersDbController],
  providers: [UsersDbService],
})
export class UsersDbModule {}
