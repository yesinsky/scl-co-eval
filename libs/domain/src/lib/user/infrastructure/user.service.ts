import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { AuthService } from '../../shared/interfaces';
import {
    CreateUserRequest,
    CreateUserResponse,
    UserCreationStatus,
} from '../entities/dto/user-create.dto';
import {
    DeleteUserRequest,
    DeleteUserResponse,
} from '../entities/dto/user-delete.dto';
import {
    UpdateUserRequest,
    UpdateUserResponse,
} from '../entities/dto/user-update.dto';
import { UserDataMapper } from '../entities/dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { Logger } from '@nestjs/common';

export interface IUserService {
    create(source: CreateUserRequest): Promise<CreateUserResponse>;
    findById(sourceId: string): Promise<UserEntity>;
    findByEmail(sourceEmail: string): Promise<UserEntity>;
    update(source: UpdateUserRequest): Promise<UpdateUserResponse>;
    delete(source: DeleteUserRequest): Promise<DeleteUserResponse>;
    clear(): Promise<void>;
}

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>,
        @Inject(forwardRef(() => AuthService))
        private readonly _authService: AuthService,
        @Inject(UserDataMapper)
        private readonly _userDataMapper: UserDataMapper
    ) {}

    async clear(): Promise<void> {
        try {
            const count = await this._userRepository.count();
            if (count > 0) {
                return await this._userRepository.clear();
            }
        } catch (e) {
            Logger.error(e);
            throw e;
        }
    }

    async findById(sourceId: string): Promise<UserEntity> {
        let user: UserEntity;
        try {
            const user = await this._userRepository.findOne({
                where: {
                    id: sourceId,
                },
            });
        } catch (e) {
            Logger.error(e);
            throw e;
        }
        return user;
    }
    async findByEmail(sourceEmail: string): Promise<UserEntity> {
        let user: UserEntity;
        try {
            const user = await this._userRepository.findOne({
                where: {
                    email: sourceEmail,
                },
            });
        } catch (e) {
            Logger.error(e);
            throw e;
        }
        return user;
    }
    update(source: UpdateUserRequest): Promise<UpdateUserResponse> {
        throw new Error('Method not implemented.');
    }
    delete(source: DeleteUserRequest): Promise<DeleteUserResponse> {
        throw new Error('Method not implemented.');
    }

    async create(source: CreateUserRequest): Promise<CreateUserResponse> {
        let result: CreateUserResponse = null;
        try {
            const { name, email, rawPassword } = source;
            const existing = await getRepository(UserEntity).find({
                where: { email: email },
            });

            const doesExist = !!existing && existing.length > 0;

            if (doesExist) {
                throw new HttpException(
                    { status: UserCreationStatus.AlreadyExist },
                    HttpStatus.BAD_REQUEST
                );
            }

            let newUser = new UserEntity();
            newUser.name = name;
            newUser.email = email;
            newUser.password = await this._authService.encryptPassword(
                rawPassword
            );

            const errors = await validate(newUser);
            if (errors.length > 0) {
                throw new HttpException(
                    { error: UserCreationStatus.ValidationError },
                    HttpStatus.BAD_REQUEST
                );
            } else {
                const savedUser = await this._userRepository.save(newUser);
                result = {
                    status: UserCreationStatus.Created,
                    user: this._userDataMapper.toDto(savedUser),
                };
            }
        } catch (e) {
            Logger.error(e);
            throw e;
        }
        return result;
    }
}
