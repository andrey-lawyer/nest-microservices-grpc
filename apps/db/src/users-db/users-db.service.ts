import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { db2 } from '@app/common';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: db2.CreateUserDto): Promise<db2.User> {
    console.log('createUserDto ' + createUserDto);
    const user = await this.userRepository.save(createUserDto);
    // const user = await this.userRepository.save({
    //   email: 'andrey-222@ukr.net',
    //   password: '123456789',
    // });
    // console.log(user);
    return user;
  }

  async findOneUser(findUserDto: db2.FindUserDto): Promise<db2.User> {
    const user = await this.userRepository.findOneBy({
      userEmail: findUserDto.userEmail,
    });
    if (!user) return { notFound: true };
    return user;
  }
}
