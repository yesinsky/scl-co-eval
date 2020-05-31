import { Test, TestingModule } from '@nestjs/testing';
import { UserService, AuthService } from '../../shared/interfaces';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ConfigModule } from '../../../../../common/src/lib/infrastructure/config/config.module';
import { ConfigService } from '../../../../../common/src/lib/infrastructure/config/config.service';
import {
    CreateUserRequest,
    UserCreationStatus,
} from '../entities/dto/user-create.dto';

jest.setTimeout(3 * 60 * 1000);

describe('UserService', () => {
    let service: UserService;

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

        service = module.get<UserService>(UserService);
    });

    afterEach(async () => {
        await service.clear();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create user on Create method call', async () => {
        const req: CreateUserRequest = {
            email: 'test@test.test',
            name: 'testname',
            rawPassword: '12345',
        };

        const res = await service.create(req);

        expect(res.status === UserCreationStatus.Created).toBeTruthy();
        expect(res.user).toBeDefined();
        expect(res.user.id).toBeDefined();
        expect(res.user.email === req.email).toBeTruthy();
        expect(res.user.name === req.name).toBeTruthy();
    });
});
