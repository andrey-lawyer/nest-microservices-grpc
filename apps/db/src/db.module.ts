import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './db.config';
import { UsersDbModule } from './users-db/users-db.module';
import { PostsDbModule } from './posts-db/posts-db.module';

@Module({
  imports: [UsersDbModule, PostsDbModule, TypeOrmModule.forRoot(dbConfig)],
})
export class DbModule {}
