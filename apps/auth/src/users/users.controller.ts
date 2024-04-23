import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import {
  CreateUserDto,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  Users,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common';

import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  findAllUsers(): Users {
    return this.usersService.findAll();
  }

  findOneUser(findOneUserDto: FindOneUserDto): User {
    return this.usersService.findOne(findOneUserDto.id);
  }

  updateUser(updateUserDto: UpdateUserDto): User {
    return this.usersService.update(updateUserDto);
  }

  removeUser({ id }: FindOneUserDto): User {
    return this.usersService.remove(id);
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
