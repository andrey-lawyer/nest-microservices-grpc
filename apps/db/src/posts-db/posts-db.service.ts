import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { db } from '@app/common';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class PostsDbService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async savePostDb(
    createPost: db.CreatePostWithUser | db.Post,
  ): Promise<db.Post> {
    const post = await this.postRepository.save(createPost);
    return post;
  }

  async getPosts(): Promise<db.Posts> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post.id', 'post.text', 'user.id', 'user.userEmail'])
      .getMany();

    return { posts };
  }

  async findOnePost(id: string): Promise<db.Post | null> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.id = :id', { id })
      .select(['post.id', 'post.text', 'user.id', 'user.userEmail'])
      .getOne();
    if (!post) return { notFound: true };
    return post;
  }

  async removeDb(id: string): Promise<db.DeletePostDto> {
    await this.postRepository.delete({ id });
    return { id };
  }

  queryPostsDb(
    paginationDtoStream: Observable<db.PaginationDto>,
  ): Observable<db.Posts> {
    const stream = paginationDtoStream.pipe(
      switchMap(async (pagination: db.PaginationDto) => {
        const start = pagination.page * pagination.skip;
        const posts = await this.postRepository
          .createQueryBuilder()
          .skip(start)
          .take(pagination.skip)
          .getMany();

        return { posts };
      }),
    );
    return stream;
  }
}
