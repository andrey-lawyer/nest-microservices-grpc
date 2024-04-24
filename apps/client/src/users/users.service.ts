import {
  CreateUserDto,
  UpdateUserDto,
  UsersServiceClient,
  USERS_SERVICE_NAME,
  User,
  Users,
  PaginationDto,
} from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AUTH_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

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

  pagination() {
    const users$ = new ReplaySubject<PaginationDto>();
    // console.log(users$);

    users$.next({ page: 0, skip: 1 });
    users$.next({ page: 1, skip: 1 });
    users$.next({ page: 2, skip: 1 });
    users$.next({ page: 3, skip: 1 });

    users$.complete();

    let chunkNumber = 1;

    this.usersService.queryUsers(users$).subscribe((users) => {
      console.log('Chunk', chunkNumber, users);
      chunkNumber += 1;
    });
  }
}
