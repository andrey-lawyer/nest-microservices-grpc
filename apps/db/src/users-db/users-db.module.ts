import { Module } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { UsersDbController } from './users-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [UsersDbController],
  providers: [UsersDbService],
})
export class UsersDbModule {}
