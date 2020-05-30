import { Injectable, Scope } from '@nestjs/common';

export type AppConf = DbConfiguration & AuthConfiguration;

interface DbConfiguration {
    dbName: string;
    dbHost: string;
    dbPort: number;

    dbUser: string;
    dbPassword: string;

    dbAuthSource: string;
}

interface AuthConfiguration {
    jwtSecret: string;
    jwtExpiresIn: number;
}

interface IConfigService {
    readonly dbName: string;
    readonly dbHost: string;
    readonly dbPort: number;

    readonly dbUser: string;
    readonly dbPassword: string;
    readonly dbAuthSource: string;

    readonly jwtSecret: string;
    readonly jwtExpiresIn: number;
}

//CB 29May2020: Scope.DEFAULT === ex Scope.SINGLETON
@Injectable({ scope: Scope.DEFAULT })
export class ConfigService implements IConfigService {

    //TODO CB 29May2020: YAGNI - Implement getting config from .env files with dotenv.
    public static TestMode = false;

    constructor() {
        this._envConfig = this._generateDefaultConfiguration(
            ConfigService.TestMode
        );
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
