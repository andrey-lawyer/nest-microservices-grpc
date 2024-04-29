import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsDbService } from './posts-db.service';
import { PostsDbController } from './posts-db.controller';

import { User } from '../entities/user.entity';
import { Post } from '../entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [PostsDbController],
  providers: [PostsDbService],
})
export class PostsDbModule {}
