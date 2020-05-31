import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err) {
      throw err;
    }
    if (!user) {
      if (!!info && !!info.message) {
        throw new UnauthorizedException(info.message.toString());
      } else {
        throw new UnauthorizedException('Could not authenticate with token.');
      }
    }
    return user;
  }
}