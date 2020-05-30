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

export interface IUserService {
    create(source: CreateUserRequest): Promise<CreateUserResponse>;
    findById(sourceId: string): Promise<UserEntity>;
    findByEmail(sourceEmail: string): Promise<UserEntity>;
    update(source: UpdateUserRequest): Promise<UpdateUserResponse>;
    delete(source: DeleteUserRequest): Promise<DeleteUserResponse>;
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

    findById(sourceId: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
    findByEmail(sourceEmail: string): Promise<UserEntity> {
        throw new Error('Method not implemented.');
    }
    update(source: UpdateUserRequest): Promise<UpdateUserResponse> {
        throw new Error('Method not implemented.');
    }
    delete(source: DeleteUserRequest): Promise<DeleteUserResponse> {
        throw new Error('Method not implemented.');
    }

    async create(dto: CreateUserRequest): Promise<CreateUserResponse> {
        const { name, email, rawPassword } = dto;
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
        newUser.password = await this._authService.encryptPassword(rawPassword);

        const errors = await validate(newUser);
        if (errors.length > 0) {
            throw new HttpException(
                { error: UserCreationStatus.ValidationError },
                HttpStatus.BAD_REQUEST
            );
        } else {
            const savedUser = await this._userRepository.save(newUser);
            const result: CreateUserResponse = {
                status: UserCreationStatus.Created,
                user: this._userDataMapper.toDto(savedUser),
            };
            return result;
        }
    }
}
