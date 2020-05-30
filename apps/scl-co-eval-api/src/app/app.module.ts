import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from 'libs/common/src/lib/infrastructure/config/config.module';
import { ConfigService } from 'libs/common/src/lib/infrastructure/config/config.service';


@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                const typeOrmOpts: TypeOrmModuleOptions = {
                    type: 'mongodb',
                    host: config.dbHost,
                    port: config.dbPort,
                    database: config.dbName,
                    username: config.dbUser,
                    password: config.dbPassword,
                    authSource: config.dbAuthSource
                };
                return typeOrmOpts;
            },
            inject: [ConfigService],
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
