import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt-auth.service';

@Module({
    imports: [forwardRef(() => UserModule)],
    exports: [AuthService, JwtAuthService],
    providers: [
        JwtAuthService,
        {
            provide: AuthService,
            useClass: JwtAuthService,
        },
    ],
})
export class AuthModule {}
