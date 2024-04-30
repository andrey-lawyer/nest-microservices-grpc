import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { db } from '@app/common';

@Injectable()
export class UsersDbService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: db.CreateUserDto): Promise<db.User> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findOneUser({ userEmail }: db.FindUserDto): Promise<db.User> {
    const user = await this.userRepository.findOneBy({
      userEmail,
    });
    if (!user) return { notFound: true };
    return user;
  }
}
