import {
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    Scope,
} from '@nestjs/common';
import { isEmail, isNotEmpty } from 'class-validator';
import { UserService } from '../shared/interfaces';
import { UserCreationStatus } from '../user/entities/dto/user-create.dto';
import { UserDataMapper } from '../user/entities/dto/user.dto';
import { UserEntity } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import {
    AccessRequest,
    AccessResponse,
    AccessStatus,
    SignUpRequest,
} from './entities/access.dto';

//CB 29May2020: Scope.DEFAULT === ex Scope.SINGLETON
@Injectable({ scope: Scope.DEFAULT })
export class JwtAuthService extends AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly _userService: UserService,
        @Inject(UserDataMapper)
        private readonly _userDataMapper: UserDataMapper,
        private readonly _logger = new Logger(JwtAuthService.name)
    ) {
        super();
    }
    async login(
        loginRequest: AccessRequest
    ): Promise<AccessStatus | AccessResponse> {
        try {
            const { email, password } = loginRequest;
            const isValidSourceData = isEmail(email) && isNotEmpty(password);

            if (!isValidSourceData) {
                return { status: AccessStatus.InvalidSourceData };
            }

            const user = await this._userService.findByEmail(
                loginRequest.email
            );
            if (!user) {
                return { status: AccessStatus.UserNotFoundOrWrongPassword };
            }
            const isPasswordMatch: boolean = await this.checkPassword(
                loginRequest.password,
                user.password
            );
            if (!isPasswordMatch) {
                return { status: AccessStatus.UserNotFoundOrWrongPassword };
            }

            const token = this._createJwt(user);
            const userDto = this._userDataMapper.toDto(user);

            return { token, user: userDto, status: AccessStatus.Authenticated };
        } catch (err) {
            this._logger.error(err);
            throw new InternalServerErrorException(
                err.message || { status: AccessStatus.ServerError }
            );
        }
    }
    async signUp(
        signUpRequest: SignUpRequest
    ): Promise<AccessStatus | AccessResponse> {
        try {
            const { email, name, password } = signUpRequest;

            const isValidData =
                isEmail(email) && isNotEmpty(name) && isNotEmpty(password);
            if (!isValidData) {
                return { status: AccessStatus.InvalidSourceData };
            }

            const createUser = await this._userService.create({
                name: name,
                email: email,
                rawPassword: password,
            });

            switch (createUser.status) {
                case UserCreationStatus.Created: {
                    return await this.login({
                        email: email,
                        password: password,
                    });
                }
                case UserCreationStatus.AlreadyExist: {
                    return { status: AccessStatus.AlreadyExistOnSignup };
                }
                case UserCreationStatus.SourceValidationError:
                case UserCreationStatus.DatabaseValidationError: {
                    return { status: AccessStatus.InvalidSourceData };
                }
                default: {
                    return { status: AccessStatus.Unsupported };
                }
            }
        } catch (err) {
            this._logger.error(err);
            throw new InternalServerErrorException(
                err.message || { status: AccessStatus.ServerError }
            );
        }
    }

    validatePayload(payload: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    private _createJwt(user: UserEntity): string {
        /*const expiresIn = this._configService.jwtExpiresIn;
        let expiration: Date;
        let issuedAt: Date;
        if (expiresIn) {
          issuedAt = new Date();
          expiration = new Date(issuedAt);
          expiration.setTime(expiration.getTime() + expiresIn * 1000);
        }
    
        const userDto = UserDataMapper.toDto(user);
        const data: JwtPayload = {
          sub: user._id,
          iat: issuedAt.getTime(),
          exp: expiration.getTime(),
          context: {
            user: userDto
          }
        };
    
        const jwt = this._jwtService.sign(data);*/
        const jwt = 'mockJwtToken';
        return jwt;
    }
}
