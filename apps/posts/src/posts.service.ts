import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { DB_SERVICE } from './constants';
import { db, posts } from '@app/common';
import {
  catchError,
  concatMap,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  GrpcNotFoundException,
  GrpcPermissionDeniedException,
} from 'nestjs-grpc-exceptions';

@Injectable()
export class PostsService implements OnModuleInit {
  private dbService: db.DbServicePostsClient;
  constructor(@Inject(DB_SERVICE) private client: ClientGrpc) {}
  onModuleInit() {
    this.dbService = this.client.getService<db.DbServicePostsClient>(
      db.DB_SERVICE_POSTS_SERVICE_NAME,
    );
  }

  create(createPost: posts.CreatePostWithUser): Observable<db.Post> {
    return this.dbService.createPost(createPost);
  }

  getPosts(): Observable<db.Posts> {
    return this.dbService.getAllPosts({});
  }

  getOnePost(id: string): Observable<db.Post> {
    console.log('id ' + id);
    return this.dbService.getOnePost({ id }).pipe(
      tap((post) => {
        if (post?.notFound) {
          throw new GrpcNotFoundException(
            `Post with id: ${id} does not exists`,
          );
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  update(updateUserDto: posts.UpdatePostWithUserId): Observable<db.Post> {
    return this.dbService.getOnePost({ id: updateUserDto.id }).pipe(
      switchMap((post) => {
        if (!post) {
          throw new GrpcNotFoundException(
            `Post with id: ${updateUserDto.id} does not exists`,
          );
        }
        if (post.user?.id !== updateUserDto.userId) {
          throw new GrpcPermissionDeniedException(
            'You do not have permission to delete',
          );
        }
        return this.dbService.updatePost({
          ...post,
          text: updateUserDto.text,
        });
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  deleteOnePost(
    deleteUser: posts.DeletePostWithUserId,
  ): Observable<db.DeletePostDto> {
    return this.dbService.getOnePost({ id: deleteUser.id }).pipe(
      switchMap((post) => {
        if (!post) {
          throw new GrpcNotFoundException(
            `Post with id: ${deleteUser.id} does not exists`,
          );
        }
        if (post.user.id !== deleteUser.userId) {
          throw new GrpcPermissionDeniedException(
            'You do not have permission to delete',
          );
        }
        return this.dbService.deletePost({ id: deleteUser.id });
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getPostsStream(
    paginationDtoStream: Observable<posts.PaginationDto>,
  ): Observable<db.Posts> {
    const stream = paginationDtoStream.pipe(
      concatMap((pagination: posts.PaginationDto) => {
        console.log('Sending paginationRequest:', pagination);
        return this.dbService.getPostsStream(of(pagination));
      }),
    );
    return stream;
  }
}
