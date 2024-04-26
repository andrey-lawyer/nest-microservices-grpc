/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface User {
  id?: string | undefined;
  userEmail?: string | undefined;
  password?: string | undefined;
}

export interface CreateUserDto {
  userEmail: string;
  password: string;
}

export interface LoginUserDto {
  userEmail: string;
  password: string;
}

export interface Token {
  token: string;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  signUpUser(request: CreateUserDto): Observable<User>;

  login(request: LoginUserDto): Observable<Token>;
}

export interface AuthServiceController {
  signUpUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  login(request: LoginUserDto): Promise<Token> | Observable<Token> | Token;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUpUser", "login"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
