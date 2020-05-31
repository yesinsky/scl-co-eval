import { Module, forwardRef, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './infrastructure/user.service';
import { UserDataMapper } from './entities/dto/user.dto';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule),
    ],
    providers: [UserService, UserDataMapper],
    exports: [UserService, UserDataMapper],
})
export class UserModule {}
