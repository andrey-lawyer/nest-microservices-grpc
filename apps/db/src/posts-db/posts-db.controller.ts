import { Controller } from '@nestjs/common';
import { PostsDbService } from './posts-db.service';
import { db } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@db.DbServicePostsControllerMethods()
export class PostsDbController implements db.DbServicePostsController {
  constructor(private readonly postsDbService: PostsDbService) {}

  createPost(
    createPost: db.CreatePostWithUser,
  ): db.Post | Promise<db.Post> | Observable<db.Post> {
    return this.postsDbService.savePostDb(createPost);
  }

  getAllPosts(): db.Posts | Promise<db.Posts> | Observable<db.Posts> {
    return this.postsDbService.getPosts();
  }

  getOnePost({ id }: db.FindOnePostDto): Promise<db.Post> {
    return this.postsDbService.findOnePost(id);
  }

  updatePost(updatePost: db.Post): Promise<db.Post> {
    return this.postsDbService.savePostDb(updatePost);
  }

  deletePost({ id }: db.DeletePostDto): Promise<db.DeletePostDto> {
    return this.postsDbService.removeDb(id);
  }

  getPostsStream(
    paginationDtoStream: Observable<db.PaginationDto>,
  ): Observable<db.Posts> {
    return this.postsDbService.queryPostsDb(paginationDtoStream);
  }
}
