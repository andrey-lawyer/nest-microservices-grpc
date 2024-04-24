import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Member } from './entities/user.entity';

type postgres = 'postgres';

const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres' as postgres,
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  entities: [Member],
};

export default dbConfig;
