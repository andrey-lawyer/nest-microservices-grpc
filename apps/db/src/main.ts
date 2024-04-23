import { NestFactory } from '@nestjs/core';
import { DbModule } from './db.module';

async function bootstrap() {
  const app = await NestFactory.create(DbModule);
  await app.listen(3000);
}
bootstrap();
