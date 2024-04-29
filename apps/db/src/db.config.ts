import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';

type postgres = 'postgres';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres' as postgres,
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  entities: [User, Post],
};

export default dbConfig;
