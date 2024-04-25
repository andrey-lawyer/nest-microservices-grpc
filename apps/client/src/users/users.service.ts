import { concatMap, from, mergeMap, Observable, of, tap, toArray } from 'rxjs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  CreateUserDto,
  UpdateUserDto,
  UsersServiceClient,
  USERS_SERVICE_NAME,
  User,
  Users,
  PaginationDto,
} from '@app/common';

import { auth2_SERVICE } from './constants';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(auth2_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto): Observable<User> {
    return this.usersService.createUser(createUserDto);
  }

  findAll(): Observable<Users> {
    return this.usersService.findAllUsers({});
  }

  findOne(id: string): Observable<User> {
    return this.usersService.findOneUser({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto): Observable<User> {
    return this.usersService.updateUser({ id, ...updateUserDto });
  }

  remove(id: string): Observable<User> {
    return this.usersService.removeUser({ id });
  }

  pagination(): Observable<any> {
    const pages: PaginationDto[] = [
      { page: 0, skip: 1 },
      { page: 1, skip: 1 },
      { page: 2, skip: 1 },
      { page: 3, skip: 1 },
    ];

    let chunkNumber = 1;
    const usersFromStream = from(pages).pipe(
      concatMap((pagination) =>
        this.usersService
          .queryUsers(of(pagination))
          //  for giving every  chunk
          .pipe(tap((users) => console.log('Chunk', chunkNumber++, users))),
      ),
      mergeMap((response) => response.users),
      toArray(),
    );
    return usersFromStream;
  }
}
