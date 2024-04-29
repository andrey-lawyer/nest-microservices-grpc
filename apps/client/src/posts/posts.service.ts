import { posts } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { posts_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { concatMap, from, mergeMap, Observable, of, tap, toArray } from 'rxjs';

@Injectable()
export class PostsService implements OnModuleInit {
  private postsService: posts.PostsServiceClient;

  constructor(@Inject(posts_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.postsService = this.client.getService<posts.PostsServiceClient>(
      posts.POSTS_SERVICE_NAME,
    );
  }

  createPost(createPostDto: posts.CreatePostWithUser): Observable<posts.Post> {
    return this.postsService.createPost(createPostDto);
  }

  getPosts(): Observable<posts.Posts> {
    return this.postsService.getAllPosts({});
  }

  findOnePost(id: string): Observable<posts.Post> {
    return this.postsService.getOnePost({ id });
  }

  update(
    id: string,
    userId: string,
    updateUserDto: posts.UpdatePostWithUserId,
  ): Observable<posts.Post> {
    return this.postsService.updatePost({ id, userId, ...updateUserDto });
  }

  remove(id: string, userId: string): Observable<posts.FindOnePostDto> {
    return this.postsService.deletePost({ id, userId });
  }

  postStream(): Observable<posts.Post[]> {
    const pages: posts.PaginationDto[] = [
      { page: 0, skip: 1 },
      { page: 1, skip: 1 },
      { page: 2, skip: 1 },
      { page: 3, skip: 1 },
    ];

    let chunkNumber = 1;
    const usersFromStream = from(pages).pipe(
      concatMap((pagination) =>
        this.postsService
          .getPostsStream(of(pagination))
          //  for giving every  chunk
          .pipe(tap((posts) => console.log('Chunk', chunkNumber++, posts))),
      ),
      mergeMap((response) => response.posts),
      toArray(),
    );
    return usersFromStream;
  }
}
