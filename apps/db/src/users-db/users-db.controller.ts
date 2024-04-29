import { Controller } from '@nestjs/common';

import { UsersDbService } from './users-db.service';
import { db } from '@app/common';

@Controller()
@db.DbServiceUsersControllerMethods()
export class UsersDbController implements db.DbServiceUsersController {
  constructor(private readonly usersDbService: UsersDbService) {}

  signUpUser(createUserDto: db.CreateUserDto): Promise<db.User> {
    return this.usersDbService.signUp(createUserDto);
  }

  findUser(findUserDto: db.FindUserDto): Promise<db.User> {
    return this.usersDbService.findOneUser(findUserDto);
  }
}
