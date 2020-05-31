import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './infrastructure/auth.service';
import { JwtAuthService } from './infrastructure/jwt-auth.service';
import { AuthController } from './application/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@scl-co-eval/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/jwt.guard';

@Module({
    imports: [
        ConfigModule,
        forwardRef(() => UserModule),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                const options: JwtModuleOptions = config.getDefaultJwtConfiguration();
                return options;
            },
            inject: [ConfigService],
        })
    ],
    exports: [AuthService, JwtAuthService, JwtStrategy, JwtAuthGuard],
    providers: [
        JwtAuthService,
        JwtStrategy,
        JwtAuthGuard,
        {
            provide: AuthService, useClass: JwtAuthService
        }
    ],
    controllers: [AuthController],
})
export class AuthModule {}
