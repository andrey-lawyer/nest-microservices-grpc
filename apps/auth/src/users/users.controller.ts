import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
  Users,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common';

import { lastValueFrom, Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async findAllUsers(): Promise<Users> {
    const result$ = this.usersService.findAll();
    const result = await lastValueFrom(result$);
    return { users: result.usersAll };
  }

  // async findOneUser(findOneUserDto: FindOneUserDto): Promise<User> {
  //   const result$ = this.usersService.findOne(findOneUserDto.id);
  //   const result = await lastValueFrom(result$);
  //   return result;
  // }

  findOneUser(findOneUserDto: FindOneUserDto) {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  removeUser({ id }: FindOneUserDto) {
    return this.usersService.remove(id);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    // const result = this.usersService
    //   .queryUsers(paginationDtoStream)
    //   .then((data) => lastValueFrom(data))
    //   .then((value) => ({ users: value.usersAll }));
    // return from(result);

    return this.usersService.queryUsers(paginationDtoStream);
  }
}
