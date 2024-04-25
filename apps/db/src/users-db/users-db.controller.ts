import { Controller } from '@nestjs/common';
import { UsersDbService } from './users-db.service';

@Controller()
export class UsersDbController {
  constructor(private readonly usersDbService: UsersDbService) {}
}
