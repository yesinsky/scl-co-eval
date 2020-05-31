import { JwtAuthService } from "./jwt-auth.service";
import { TestingModule, Test } from '@nestjs/testing';
import { ConfigModule } from '../../../../common/src/lib/infrastructure/config/config.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../../../../common/src/lib/infrastructure/config/config.service';
import { UserEntity } from '../user/entities/user.entity';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../shared/interfaces';
import { AuthService } from './auth.service';
import { AccessRequest, SignUpRequest, AccessResponse, AccessStatus } from './entities/access.dto';
import { onErrorResumeNext } from 'rxjs';


jest.setTimeout(3 * 60 * 1000);
//ConfigService.TestMode = true;

describe('JwtAuthService', () => {
    let authService: JwtAuthService;
    let userService: UserService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
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
                            authSource: config.dbAuthSource,
                            autoLoadEntities: true,
                        };
                        return typeOrmOpts;
                    },
                    inject: [ConfigService],
                }),
                TypeOrmModule.forFeature([UserEntity]),
                AuthModule,
                UserModule,
            ],
            providers: [UserService, <any>AuthService],
        }).compile();

        authService = module.get<JwtAuthService>(JwtAuthService);
        userService = module.get<UserService>(UserService);
    });

    afterEach(async () => {
        await userService.clear();
    });

    it('should have defined services', () => {
        expect(userService).toBeDefined();
        expect(authService).toBeDefined();
    });

    it('should create user on login with valid source data', async () => {
        const email =  'test@test.test';
        const name = 'test_user';
        const password = 'qwerty';

        const signupData:  SignUpRequest = {
            email, name, password
        }
        const res = await authService.signUp(signupData);

        const typedRes = (res as AccessResponse);
        expect(typedRes).toBeDefined();
        expect(typedRes.status).toBeDefined();
        expect(typedRes.status === AccessStatus.Authenticated).toBeTruthy();
        expect(typedRes.user).toBeDefined();
        expect(typedRes.user.email === email).toBeTruthy();
        expect(typedRes.token).toBeDefined();
    });
});
