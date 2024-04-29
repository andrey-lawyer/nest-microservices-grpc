import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  GrpcAlreadyExistsException,
  GrpcUnauthenticatedException,
} from 'nestjs-grpc-exceptions';

import { auth, db } from '@app/common';
import { DB_SERVICE } from './constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private dbService: db.DbServiceUsersClient;
  constructor(
    @Inject(DB_SERVICE) private client: ClientGrpc,
    private jwtService: JwtService,
  ) {}
  onModuleInit() {
    this.dbService = this.client.getService<db.DbServiceUsersClient>(
      db.DB_SERVICE_USERS_SERVICE_NAME,
    );
  }

  create(createUserDto: auth.CreateUserDto): Observable<auth.User> {
    return this.dbService.findUser(createUserDto).pipe(
      switchMap((user) => {
        if (!user?.notFound) {
          throw new GrpcAlreadyExistsException('User already exists');
        }

        return from(bcrypt.hash(createUserDto.password, 10)).pipe(
          switchMap((passwordHash) =>
            this.dbService.signUpUser({
              ...createUserDto,
              password: passwordHash,
            }),
          ),
          switchMap((registeredUser) => {
            return of({
              userEmail: registeredUser.userEmail,
              id: registeredUser.id,
            });
          }),
        );
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  login(loginUserDto: auth.LoginUserDto): Observable<auth.Token> {
    return this.dbService.findUser(loginUserDto).pipe(
      switchMap((user) => {
        if (user?.notFound) {
          throw new GrpcUnauthenticatedException('Invalid email');
        }

        return from(bcrypt.compare(loginUserDto.password, user.password)).pipe(
          switchMap((isPasswordMatched) => {
            if (!isPasswordMatched) {
              throw new GrpcUnauthenticatedException('Invalid password');
            }
            const token = this.jwtService.sign({
              id: user.id,
              userEmail: user.userEmail,
            });
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
