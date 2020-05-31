export type AppConf = DbConfiguration & AuthConfiguration;

export type DbConfiguration = {
    dbName: string;
    dbHost: string;
    dbPort: number;

    dbUser: string;
    dbPassword: string;

    dbAuthSource: string;
}

export type AuthConfiguration = {
    jwtSecret: string;
    jwtExpiresIn: number;
}

export interface IConfigService<T, U> {
    readonly dbName: string;
    readonly dbHost: string;
    readonly dbPort: number;

    readonly dbUser: string;
    readonly dbPassword: string;
    readonly dbAuthSource: string;

    readonly jwtSecret: string;
    readonly jwtExpiresIn: number;

    getDefaultOrmConfiguration(): T;
    getDefaultJwtConfiguration(): U;
}