import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

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