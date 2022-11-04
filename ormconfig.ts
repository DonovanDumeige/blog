import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { ConfigService } from '@nestjs/config/dist';
import { Message, User } from 'src/entities';

const c = new ConfigService();
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3310,
  username: 'nest',
  password: 'admin',
  database: 'nestblog',
  entities: [Message, User],
  synchronize: true,
};

export default config;
