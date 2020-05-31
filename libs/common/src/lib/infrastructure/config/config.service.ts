import { Injectable, Scope } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import {
    IConfigService,
    AppConf,
    DbConfiguration,
    AuthConfiguration,
} from './config.meta';

//CB 29May2020: Scope.DEFAULT === ex Scope.SINGLETON
@Injectable({ scope: Scope.DEFAULT })
export class ConfigService implements IConfigService<TypeOrmModuleOptions, JwtModuleOptions> {
    //TODO CB 29May2020: YAGNI - Implement getting config from .env files with dotenv.
    public static TestMode = false;

    constructor() {
        this._envConfig = this._generateDefaultConfiguration(
            ConfigService.TestMode
        );
    }

    getDefaultOrmConfiguration(): TypeOrmModuleOptions {
        const config: TypeOrmModuleOptions = {
            name: 'default',
            type: 'mongodb',
            host: this.dbHost,
            port: this.dbPort,
            database: this.dbName,
            username: this.dbUser,
            password: this.dbPassword,
            authSource: this.dbAuthSource,
            autoLoadEntities: true,
        };
        return config;
    }

    getDefaultJwtConfiguration(): JwtModuleOptions{
        const config : JwtModuleOptions = {
            secret: this.jwtSecret,
        };
        return config;
    }

    get dbName(): string {
        return this._envConfig.dbName;
    }
    get dbHost(): string {
        return this._envConfig.dbHost;
    }
    get dbPort(): number {
        return this._envConfig.dbPort;
    }
    get dbUser(): string {
        return this._envConfig.dbUser;
    }
    get dbPassword(): string {
        return this._envConfig.dbPassword;
    }
    get dbAuthSource(): string {
        return this._envConfig.dbAuthSource;
    }
    get jwtSecret(): string {
        return this._envConfig.jwtSecret;
    }
    get jwtExpiresIn(): number {
        return this._envConfig.jwtExpiresIn;
    }

    private _envConfig: AppConf;

    //TODO CB 29May2020: YAGNI - Implement getting config from .env files with dotenv.
    //TODO CB 29May2020: YAGNI - Do not use 'magic strings'.
    private _generateDefaultConfiguration(isTestMode: boolean): AppConf {
        const dbConf: DbConfiguration = {
            dbName: isTestMode ? 'scl-co-eval-test' : 'scl-co-eval',
            dbHost: 'localhost',
            dbPort: 27017,
            dbUser: 'test',
            dbPassword: 'test',
            dbAuthSource: 'admin',
        };
        const authConf: AuthConfiguration = {
            jwtSecret: 'secret',
            jwtExpiresIn: 600,
        };
        return { ...dbConf, ...authConf };
    }
}
