import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import * as bcrypt from 'bcrypt';
import * as grpc from '@grpc/grpc-js'.

import { auth, db2 } from '@app/common';
import { DB_SERVICE } from './constants';
import { JwtService } from '@nestjs/jwt';
// import { FitRpcException } from './filters/rpcExceptionFilter';

export interface IRpcException {
  message: string;
  status: number;
}
class FitRpcException extends RpcException implements IRpcException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.initStatusCode(statusCode);
  }
  public status: number;

  private initStatusCode(statusCode) {
    this.status = statusCode;
  }
}

@Injectable()
export class AuthService implements OnModuleInit {
  private dbService: db2.DbServiceUsersClient;
  constructor(
    @Inject(DB_SERVICE) private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}
  onModuleInit() {
    this.dbService = this.client.getService<db2.DbServiceUsersClient>(
      db2.DB_SERVICE_USERS_SERVICE_NAME,
    );
  }

  create(createUserDto: auth.CreateUserDto): Observable<db2.User> {
    return this.dbService.findUser(createUserDto).pipe(
      switchMap((user) => {
        if (!user?.notFound) {
          // return throwError(
          //   () =>
          //     new RpcException(new ConflictException('User already exists')),
          // );
          // throw new RpcException(new ConflictException('User already exists'));
          // return throwError(
          //   () =>
          //     new RpcException({
          //       statusCode: 409,
          //       message: 'User already exists',
          //     }),
          // );
          // throw new FitRpcException('User already exists', 409);
          throw new FitRpcException(
            'error',
             409
          );
          // throw new RpcException({
          //   code: 5,
          //   message: 'User already exists',
          // });
        }

        return from(bcrypt.hash(createUserDto.password, 10)).pipe(
          switchMap((passwordHash) =>
            this.dbService.signUpUser({
              ...createUserDto,
              password: passwordHash,
            }),
          ),
        );
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  login(loginUserDto: auth.LoginUserDto): Observable<auth.Token> {
    // return this.dbService.findUser(loginUserDto);
    return this.dbService.findUser(loginUserDto).pipe(
      switchMap((user) => {
        if (!user) {
          throw new UnauthorizedException('Invalid email');
        }

        return bcrypt.compare(loginUserDto.password, user.password).pipe(
          switchMap((isPasswordMatched) => {
            if (!isPasswordMatched) {
              throw new UnauthorizedException('Invalid password');
            }

            const token = this.jwtService.sign({ id: user.id });
            return of({ token });
          }),
          catchError((error) => {
            return throwError(() => error);
          }),
        );
      }),
    );
  }
}
