import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { auth } from '@app/common';
import { auth_SERVICE } from './constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private usersService: auth.AuthServiceClient;

  constructor(@Inject(auth_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<auth.AuthServiceClient>(
      auth.AUTH_SERVICE_NAME,
    );
  }

  signUp(createUserDto: auth.CreateUserDto): Observable<auth.User> {
    return this.usersService.signUpUser(createUserDto);
  }

  login(loginUserDto: auth.LoginUserDto): Observable<auth.Token> {
    return this.usersService.login(loginUserDto);
  }
}
