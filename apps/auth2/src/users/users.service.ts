import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { concatMap, map, Observable, of } from 'rxjs';

import {
  CreateUserDto,
  UpdateUserDto,
  PaginationDto,
  Users,
  db,
} from '@app/common';
import { DB_SERVICE } from './constants';

@Injectable()
export class UsersService implements OnModuleInit {
  private dbService: db.DbServiceClient;
  constructor(@Inject(DB_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.dbService = this.client.getService<db.DbServiceClient>(
      db.DB_SERVICE_NAME,
    );
  }

  create(createUserDto: CreateUserDto): Observable<db.UserResponse> {
    return this.dbService.createDbUser(createUserDto);
  }

  findAll(): Observable<db.UsersAllResponse> {
    return this.dbService.getAllUsers({});
  }

  findOne(id: string): Observable<db.UserResponse> {
    return this.dbService.getOneUser({ id });
  }

  update(updateUserDto: UpdateUserDto): Observable<db.UserResponse> {
    return this.dbService.updateDbUser(updateUserDto);
  }

  remove(id: string): Observable<db.UserResponse> {
    return this.dbService.deleteDbUser({ id });
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const stream = paginationDtoStream.pipe(
      concatMap((pagination: PaginationDto) => {
        console.log('Sending paginationRequest:', pagination);
        return this.dbService
          .paginationQueryUsers(of(pagination))
          .pipe(map((data: db.UsersAllResponse) => ({ users: data.usersAll })));
      }),
    );
    return stream;
  }
}
