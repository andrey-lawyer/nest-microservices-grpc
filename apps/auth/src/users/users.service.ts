import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

import {
  User,
  CreateUserDto,
  UpdateUserDto,
  PaginationDto,
  db,
} from '@app/common';
import { DB_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { Users } from '../../../../libs/common/src/types/auth';

@Injectable()
export class UsersService implements OnModuleInit {
  private dbService: db.DbServiceClient;
  constructor(@Inject(DB_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.dbService = this.client.getService<db.DbServiceClient>(
      db.DB_SERVICE_NAME,
    );
  }

  private readonly users: User[] = [];

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
    return this.dbService.paginationQueryUsers(paginationDtoStream).pipe(
      tap((data: db.UsersAllResponse) => {
        console.log('Received data:', data);
      }),
      map((data: db.UsersAllResponse) => ({ users: data.usersAll })),
    );
  }
  // queryUsers(
  //   paginationDtoStream: Observable<PaginationDto>,
  // ): Observable<Users> {
  //   return paginationDtoStream.pipe(
  //     switchMap((pagination: PaginationDto) => {
  //       return new Observable<Users>((observer) => {
  //         const paginationRequest: db.PaginationUsersRequest = {
  //           page: pagination.page,
  //           skip: pagination.skip,
  //         };
  //         //
  //         console.log('Sending paginationRequest:', paginationRequest);
  //         //
  //         this.dbService.paginationQueryUsers(of(paginationRequest)).subscribe({
  //           next: (data: db.UsersAllResponse) => {
  //             console.log(data);
  //             observer.next({ users: data.usersAll });
  //           },
  //           error: (error) => {
  //             observer.error(error);
  //           },
  //           complete: () => {
  //             observer.complete();
  //           },
  //         });
  //       });
  //     }),
  //   );
  // }
  // return paginationDtoStream.pipe(
  //   switchMap((pagination: db.PaginationUsersRequest) => {
  //     return this.dbService.paginationQueryUsers(pagination);
  //   }),
  // );
}
