import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

import { auth } from '@app/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  private usersService: auth.AuthServiceClient;

  constructor(
    private jwtService: JwtService,
    @Inject(auth.AUTH_SERVICE_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.usersService = this.client.getService<auth.AuthServiceClient>(
      auth.AUTH_SERVICE_NAME,
    );
  }

  signUp(createUserDto: auth.CreateUserDto): Observable<auth.User> {
    return this.usersService.signUpUser(createUserDto);
  }

  login(loginUserDto: auth.LoginUserDto): Observable<{ token: string }> {
    return this.usersService.login(loginUserDto).pipe(
      map((user) => {
        const payload = { id: user.id, userEmail: user.userEmail };
        const token = this.jwtService.sign(payload);
        return { token };
      }),
    );
  }
}
