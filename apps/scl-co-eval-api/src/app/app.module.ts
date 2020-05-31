import { Module, forwardRef } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@scl-co-eval/common';
import {
    UserModule,
    AuthModule,
} from '@scl-co-eval/domain';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                const typeOrmOpts: TypeOrmModuleOptions = config.getDefaultOrmConfiguration();
                return typeOrmOpts;
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
