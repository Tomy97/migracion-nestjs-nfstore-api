import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  isGlobal: true,
});

const configService = new ConfigService();
export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST' || 'DATABASE_HOST'),
  port: configService.get('DB_PORT' || 'DATABASE_PORT'),
  username: configService.get('DB_USER' || 'DATABASE_USER'),
  password: configService.get('DB_PASSWORD' || 'DATABASE_PASSWORD'),
  database: configService.get('DB_NAME' || 'DATABASE_NAME'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  synchronize: true
};

export const AppDs = new DataSource(DataSourceConfig);
