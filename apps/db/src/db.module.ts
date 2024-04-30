import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import dbConfig from './db.config';

import { AllExceptionsFilter } from './filters/rpc-exception.filter';

import { UsersDbModule } from './users-db/users-db.module';
import { PostsDbModule } from './posts-db/posts-db.module';

@Module({
  imports: [UsersDbModule, PostsDbModule, TypeOrmModule.forRoot(dbConfig)],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class DbModule {}
