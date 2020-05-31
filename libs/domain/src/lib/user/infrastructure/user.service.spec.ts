import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getManager } from 'typeorm';
import { ConfigModule } from '@scl-co-eval/common';
import { ConfigService } from '@scl-co-eval/common';
import { AuthModule } from '../../auth/auth.module';
import {
    CreateUserRequest,
    UserCreationStatus,
} from '../entities/dto/user-create.dto';
import { UserEntity } from '../entities/user.entity';
import { UserModule } from '../user.module';
import { UserService } from './user.service';

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
                        const typeOrmOpts: TypeOrmModuleOptions = config.getDefaultOrmConfiguration();
                        return typeOrmOpts;
                    },
                    inject: [ConfigService],
                }),
                AuthModule,
                UserModule
            ]
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

    it('should fail on Create method call with invalid data', async () => {
        const invalidEmail = await service.create({
            email: '56v3bey5',
            name: 'testname',
            rawPassword: '12345',
        });

        const invalidName = await service.create({
            email: 'norma;@test.com',
            name: '',
            rawPassword: '12345',
        });

        const invalidPwd = await service.create({
            email: 'norma;@test.com',
            name: 'name',
            rawPassword: '',
        });

        expect(
            invalidEmail.status === UserCreationStatus.SourceValidationError
        ).toBeTruthy();
        expect(
            invalidName.status === UserCreationStatus.SourceValidationError
        ).toBeTruthy();
        expect(
            invalidPwd.status === UserCreationStatus.SourceValidationError
        ).toBeTruthy();
    });

    it('should find user by ObjectID', async () => {
        const testUser = new UserEntity();
        testUser.email = 'test@test.test';
        testUser.name = 'testname';
        testUser.password = '12345';

        let userRepo = getManager('default').getRepository(UserEntity);
        const created = await userRepo.save(testUser);

        const res = await service.findById(created.id);

        expect(res).toBeDefined();
        expect(res.email == testUser.email).toBeTruthy();
    });

    it('should find user by string id', async () => {
        const testUser = new UserEntity();
        testUser.email = 'test@test.test';
        testUser.name = 'testname';
        testUser.password = '12345';

        let userRepo = getManager('default').getRepository(UserEntity);
        const created = await userRepo.save(testUser);

        const res = await service.findById(created.id.toString());

        expect(res).toBeDefined();
        expect(res.email == testUser.email).toBeTruthy();
    });

    it('should find user by email', async () => {
        const testUser = new UserEntity();
        testUser.email = 'test@test.test';
        testUser.name = 'testname';
        testUser.password = '12345';

        let userRepo = getManager('default').getRepository(UserEntity);
        const created = await userRepo.save(testUser);

        const res = await service.findByEmail(created.email);

        expect(res).toBeDefined();
        expect(res.email == testUser.email).toBeTruthy();
    });
});
