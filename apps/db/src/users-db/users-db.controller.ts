import { Controller } from '@nestjs/common';

import { UsersDbService } from './users-db.service';
import { db2 } from '@app/common';

@Controller()
@db2.DbServiceUsersControllerMethods()
export class UsersDbController implements db2.DbServiceUsersController {
  constructor(private readonly usersDbService: UsersDbService) {}

  signUpUser(createUserDto: db2.CreateUserDto): Promise<db2.User> {
    return this.usersDbService.signUp(createUserDto);
  }

  findUser(findUserDto: db2.FindUserDto): Promise<db2.User> {
    return this.usersDbService.findOneUser(findUserDto);
  }
}
