import { NestFactory } from '@nestjs/core';
import { PostsModule } from './posts.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { posts } from '@app/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PostsModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../posts.proto'),
        package: posts.POSTS_PACKAGE_NAME,
        url: 'localhost:5006',
      },
    },
  );
  await app.listen();
  logger.log('posts microservice is listening');
}
bootstrap();
