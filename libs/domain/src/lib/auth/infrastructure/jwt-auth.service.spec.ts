import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '../../../../../common/src/lib/infrastructure/config/config.module';
import { ConfigService } from '../../../../../common/src/lib/infrastructure/config/config.service';
import { UserService } from '../../user/infrastructure/user.service';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../auth.module';
import {
    AccessRequest,
    AccessResponse,
    AccessStatus,
    SignUpRequest,
} from '../entities/access.dto';
import { JwtAuthService } from './jwt-auth.service';

jest.setTimeout(3 * 60 * 1000);

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
                        const typeOrmOpts: TypeOrmModuleOptions = config.getDefaultOrmConfiguration();
                        return typeOrmOpts;
                    },
                    inject: [ConfigService],
                }),
                AuthModule,
                UserModule,
            ],
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

    it('should create user on SignUp with valid source data', async () => {
        const email = 'test@test.test';
        const name = 'test_user';
        const password = 'qwerty';

        const signupData: SignUpRequest = {
            email,
            name,
            password,
        };

        const typedRes: AccessResponse = await authService.signUp(signupData);
        expect(typedRes).toBeDefined();
        expect(typedRes.status).toBeDefined();
        expect(typedRes.status === AccessStatus.Authenticated).toBeTruthy();
        expect(typedRes.user).toBeDefined();
        expect(typedRes.user.email === email).toBeTruthy();
        expect(typedRes.token).toBeDefined();
    });

    it('should return UserNotFoundOrWrongPassword on invalid login', async () => {
        const email = 'test@test.test';
        const password = 'qwerty';

        const signupData: AccessRequest = {
            email,
            password,
        };

        const typedRes: AccessResponse = await authService.login(signupData);
        expect(typedRes).toBeDefined();
        expect(typedRes.status).toBeDefined();
        expect(
            typedRes.status === AccessStatus.UserNotFoundOrWrongPassword
        ).toBeTruthy();
        expect(typedRes.user).not.toBeDefined();
    });
});
