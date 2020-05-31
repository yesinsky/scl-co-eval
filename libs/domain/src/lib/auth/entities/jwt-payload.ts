import { UserDto } from '../../user/entities/dto/user.dto';

export type JwtPayload = {
    sub: string;
    iat: number;
    exp: number;
    context: {
      user: UserDto
    }
  }