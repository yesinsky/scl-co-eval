import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';
import { DataMapper } from '../../../shared/interfaces';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ObjectID as MongoObjectID } from 'mongodb';

export class UserDto {
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    name?: string;
    @IsEmail()
    email?: string;
}

@Injectable()
export class UserDataMapper implements DataMapper<UserEntity, UserDto> {
    fromDto(dto: UserDto): UserEntity {
        const entity = new UserEntity();
        entity.id = new MongoObjectID(dto.id);
        entity.name = dto.name;
        entity.email = dto.email;

        return entity;
    }

    toDto(source: UserEntity): UserDto {
        return {
            id: source.id.toString(),
            name: source.name,
            email: source.email,
        };
    }
}
