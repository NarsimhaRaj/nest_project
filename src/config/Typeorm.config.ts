import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as entities from '../entities';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_local',
      entities: Object.entries(entities).map((entry) => entry[1]) ?? [],
    };
    return options;
  }
}
