import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/infrastructure/user.service';

export interface DataMapper<E, D> {
    toDto(entity: E): D;
    fromDto(dto: D): E;
}

//CB 29May2020: Dependency bridge.
export {
    AuthService,
    UserService
};