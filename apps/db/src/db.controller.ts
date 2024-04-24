import { Controller } from '@nestjs/common';
import { DbService } from './db.service';

import { db } from '@app/common';

import { Observable } from 'rxjs';

@Controller()
@db.DbServiceControllerMethods()
export class DbController implements db.DbServiceController {
  constructor(private readonly dbService: DbService) {}

  createDbUser(
    createUserRequest: db.CreateUserRequest,
  ): Promise<db.UserResponse> {
    return this.dbService.createDb(createUserRequest);
  }

  getAllUsers(): Promise<db.UsersAllResponse> {
    return this.dbService.findAllDb();
  }

  getOneUser(
    getOneUserRequest: db.GetOneUserRequest,
  ): Promise<db.UserResponse> {
    return this.dbService.findOneDb(getOneUserRequest.id);
  }

  updateDbUser(
    updateUserRequest: db.UpdateUserRequest,
  ): Promise<db.UserResponse> {
    return this.dbService.updateDb(updateUserRequest);
  }

  deleteDbUser({ id }: db.DeleteOneUserRequest): Promise<db.UserResponse> {
    return this.dbService.removeDb(id);
  }

  paginationQueryUsers(
    paginationDtoStream: Observable<db.PaginationUsersRequest>,
  ): Observable<db.UsersAllResponse> {
    return this.dbService.queryUsersDb(paginationDtoStream);
  }
}
