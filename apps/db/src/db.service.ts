import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';

import { db } from '@app/common';
import { Repository } from 'typeorm';
import { Member } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DbService {
  constructor(
    @InjectRepository(Member)
    private readonly userRepository: Repository<Member>,
  ) {}

  async createDb(
    createUserDto: db.CreateUserRequest,
  ): Promise<db.UserResponse> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findAllDb(): Promise<db.UsersAllResponse> {
    const users = await this.userRepository.find({});
    return { usersAll: users };
  }

  async findOneDb(id: string): Promise<db.UserResponse> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async updateDb(
    updateUserRequest: db.UpdateUserRequest,
  ): Promise<db.UserResponse> {
    const user = await this.userRepository.findOneBy({
      id: updateUserRequest.id,
    });
    if (!user)
      throw new NotFoundException(
        `User not found by id ${updateUserRequest.id}.`,
      );

    const updatedUser = { ...user, ...updateUserRequest };
    return await this.userRepository.save(updatedUser);
  }

  async removeDb(id: string): Promise<db.UserResponse> {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (!user) throw new NotFoundException(`User not found by id ${id}.`);
    await this.userRepository.delete({ id });
    return user;
  }

  //  need to check
  queryUsersDb(
    paginationDtoStream: Observable<db.PaginationUsersRequest>,
  ): Observable<db.UsersAllResponse> {
    return paginationDtoStream.pipe(
      switchMap(async (pagination: db.PaginationUsersRequest) => {
        const start = pagination.page * pagination.skip;
        console.log(pagination.page);
        const someUsers = await this.userRepository
          .createQueryBuilder()
          .skip(start)
          .take(pagination.skip)
          .getMany();
        console.log(someUsers);
        return { usersAll: someUsers };
      }),
    );
  }


}
