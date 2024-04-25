import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from './entities/user.entity';

import { DbController } from './db.controller';
import { DbService } from './db.service';
import dbConfig from './db.config';
import { UsersDbModule } from './users-db/users-db.module';

@Module({
  imports: [
    UsersDbModule,
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Member]),
  ],
  controllers: [DbController],
  providers: [DbService],
})
export class DbModule {}
