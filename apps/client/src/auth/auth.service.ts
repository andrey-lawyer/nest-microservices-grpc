import {
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, Observable, throwError } from 'rxjs';

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
    return this.usersService.signUpUser(createUserDto).pipe(
      // catchError((error) => {
      //   console.log(error);
      //   const errorMessage = error.details || 'Unknown error';
      //   console.error('Error from gRPC:', errorMessage);
      //   throw new RpcException(errorMessage);
      // }),
      catchError((error) => throwError(() => new RpcException(error))),
    );
    // catchError((error) => {
    //   if (error instanceof ConflictException) {
    //     console.error('User already exists:', error.message);
    //   } else {
    //     console.error('Unexpected error:', error);
    //   }
    //   return throwError(() => error.message);
    // }),
  }
  login(loginUserDto: auth.LoginUserDto): Observable<auth.Token> {
    return this.usersService.login(loginUserDto);
  }
}
