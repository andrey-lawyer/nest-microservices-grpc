import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { db2 } from '@app/common';
import { DB_SERVICE } from './constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private dbService: db2.DbServiceUsersClient;
  constructor(@Inject(DB_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.dbService = this.client.getService<db2.DbServiceUsersClient>(
      db2.DB_SERVICE_USERS_SERVICE_NAME,
    );
  }

  create(createUserDto: db2.CreateUserDto): Observable<db2.User> {
    return this.dbService.signUpUser(createUserDto);
  }

  login(loginUserDto: db2.LoginUserDto): Observable<db2.User> {
    return this.dbService.login(loginUserDto);
  }
}
