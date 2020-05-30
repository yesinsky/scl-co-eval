import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './infrastructure/user.service';
import { UserDataMapper } from './entities/dto/user.dto';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [],
    providers: [UserService, UserDataMapper],
    exports: [UserService],
})
export class UserModule {}
