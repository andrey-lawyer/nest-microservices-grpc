/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "database";

export interface User {
  id: string;
  userEmail: string;
}

export interface CreateUserDto {
  userEmail: string;
  password: string;
}

export interface LoginUserDto {
  userEmail: string;
  password: string;
}

export interface Post {
  id: string;
  text: string;
  user: User | undefined;
}

export interface Posts {
  posts: Post[];
}

export interface FindOnePostDto {
  id: string;
}

export interface CreatePostWithUser {
  id: string;
  text: string;
  user: User | undefined;
}

export interface UpdatePostWithUserId {
  id: string;
  text: string;
  userId: string;
}

export interface DeletePostWithUserId {
  id: string;
  userId: string;
}

export interface PaginationDto {
  page: number;
  skip: number;
}

export interface Empty {
}

export const DATABASE_PACKAGE_NAME = "database";

export interface DbServiceUsersClient {
  signUpUser(request: CreateUserDto): Observable<User>;

  login(request: LoginUserDto): Observable<User>;
}

export interface DbServiceUsersController {
  signUpUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  login(request: LoginUserDto): Promise<User> | Observable<User> | User;
}

export function DbServiceUsersControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUpUser", "login"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DbServiceUsers", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DbServiceUsers", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DB_SERVICE_USERS_SERVICE_NAME = "DbServiceUsers";

export interface DbServicePostsClient {
  createPost(request: CreatePostWithUser): Observable<Post>;

  getAllPosts(request: Empty): Observable<Posts>;

  getOnePost(request: FindOnePostDto): Observable<Post>;

  updatePost(request: UpdatePostWithUserId): Observable<Post>;

  deletePost(request: DeletePostWithUserId): Observable<Post>;

  getPostsStream(request: Observable<PaginationDto>): Observable<Posts>;
}

export interface DbServicePostsController {
  createPost(request: CreatePostWithUser): Promise<Post> | Observable<Post> | Post;

  getAllPosts(request: Empty): Promise<Posts> | Observable<Posts> | Posts;

  getOnePost(request: FindOnePostDto): Promise<Post> | Observable<Post> | Post;

  updatePost(request: UpdatePostWithUserId): Promise<Post> | Observable<Post> | Post;

  deletePost(request: DeletePostWithUserId): Promise<Post> | Observable<Post> | Post;

  getPostsStream(request: Observable<PaginationDto>): Observable<Posts>;
}

export function DbServicePostsControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createPost", "getAllPosts", "getOnePost", "updatePost", "deletePost"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DbServicePosts", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["getPostsStream"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DbServicePosts", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DB_SERVICE_POSTS_SERVICE_NAME = "DbServicePosts";
