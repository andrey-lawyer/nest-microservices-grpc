import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from '../auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { posts_SERVICE } from './constants';
import { posts } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: posts_SERVICE,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5006',
          package: posts.POSTS_PACKAGE_NAME,
          protoPath: join(__dirname, '../posts.proto'),
        },
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
