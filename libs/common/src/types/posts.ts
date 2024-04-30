/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "posts";

export interface User {
  id?: string | undefined;
  userEmail?: string | undefined;
}

export interface Post {
  id?: string | undefined;
  text?: string | undefined;
  user?: User | undefined;
}

export interface Posts {
  posts: Post[];
}

export interface FindOnePostDto {
  id: string;
}

export interface CreatePostWithUser {
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

export const POSTS_PACKAGE_NAME = "posts";

export interface PostsServiceClient {
  createPost(request: CreatePostWithUser): Observable<Post>;

  getAllPosts(request: Empty): Observable<Posts>;

  getOnePost(request: FindOnePostDto): Observable<Post>;

  updatePost(request: UpdatePostWithUserId): Observable<Post>;

  deletePost(request: DeletePostWithUserId): Observable<FindOnePostDto>;

  getPostsStream(request: Observable<PaginationDto>): Observable<Posts>;
}

export interface PostsServiceController {
  createPost(request: CreatePostWithUser): Promise<Post> | Observable<Post> | Post;

  getAllPosts(request: Empty): Promise<Posts> | Observable<Posts> | Posts;

  getOnePost(request: FindOnePostDto): Promise<Post> | Observable<Post> | Post;

  updatePost(request: UpdatePostWithUserId): Promise<Post> | Observable<Post> | Post;

  deletePost(request: DeletePostWithUserId): Promise<FindOnePostDto> | Observable<FindOnePostDto> | FindOnePostDto;

  getPostsStream(request: Observable<PaginationDto>): Observable<Posts>;
}

export function PostsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createPost", "getAllPosts", "getOnePost", "updatePost", "deletePost"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PostsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["getPostsStream"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PostsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const POSTS_SERVICE_NAME = "PostsService";
