/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "db";

export interface CreateUserRequest {
  username: string;
  password: string;
}

export interface GetOneUserRequest {
  id: string;
}

export interface DeletetOneUserRequest {
  id: string;
}

export interface UpdateUserRequest {
  id: string;
  socialMediaUser: SocialMediaUser | undefined;
}

export interface PaginationUsersRequest {
  page: number;
  skip: number;
}

export interface GetAllUsersRequest {
}

export interface UsersAllResponse {
  usersAll: UserResponse[];
}

export interface UserResponse {
  id: string;
  username: string;
  password: string;
  socialMediaUser: SocialMediaUser | undefined;
}

export interface SocialMediaUser {
  twitterUri?: string | undefined;
  fbUri?: string | undefined;
}

export const DB_PACKAGE_NAME = "db";

export interface DbServiceClient {
  createDbUser(request: CreateUserRequest): Observable<UserResponse>;

  getAllUsers(request: GetAllUsersRequest): Observable<UsersAllResponse>;

  getOneUser(request: GetOneUserRequest): Observable<UserResponse>;

  updateDbUser(request: UpdateUserRequest): Observable<UserResponse>;

  deleteDbUser(request: DeletetOneUserRequest): Observable<UserResponse>;

  paginationQueryUsers(request: Observable<PaginationUsersRequest>): Observable<UsersAllResponse>;
}

export interface DbServiceController {
  createDbUser(request: CreateUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  getAllUsers(request: GetAllUsersRequest): Promise<UsersAllResponse> | Observable<UsersAllResponse> | UsersAllResponse;

  getOneUser(request: GetOneUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  updateDbUser(request: UpdateUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  deleteDbUser(request: DeletetOneUserRequest): Promise<UserResponse> | Observable<UserResponse> | UserResponse;

  paginationQueryUsers(request: Observable<PaginationUsersRequest>): Observable<UsersAllResponse>;
}

export function DbServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createDbUser", "getAllUsers", "getOneUser", "updateDbUser", "deleteDbUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DbService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["paginationQueryUsers"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DbService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DB_SERVICE_NAME = "DbService";
