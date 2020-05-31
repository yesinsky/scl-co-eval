import { IsEmail } from 'class-validator';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    /*@BeforeInsert()
    async hashPassword() {
      this.password = await argon2.hash(this.password);
    }*/
}
