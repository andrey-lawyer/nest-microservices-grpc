import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { posts } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@posts.PostsServiceControllerMethods()
export class PostsController implements posts.PostsServiceController {
  constructor(private readonly postsService: PostsService) {}

  createPost(createUserDto: posts.CreatePostWithUser): Observable<posts.Post> {
    return this.postsService.create(createUserDto);
  }

  getAllPosts(): Observable<posts.Posts> {
    return this.postsService.getPosts();
  }

  getOnePost(
    findOnePostDto: posts.FindOnePostDto,
  ): posts.Post | Observable<posts.Post> | Promise<posts.Post> {
    return this.postsService.getOnePost(findOnePostDto.id);
  }

  updatePost(
    updatePost: posts.UpdatePostWithUserId,
  ): posts.Post | Promise<posts.Post> | Observable<posts.Post> {
    return this.postsService.update(updatePost);
  }

  deletePost(
    deletePost: posts.DeletePostWithUserId,
  ): posts.Post | Promise<posts.Post> | Observable<posts.FindOnePostDto> {
    return this.postsService.deleteOnePost(deletePost);
  }

  getPostsStream(
    paginationDto: Observable<posts.PaginationDto>,
  ): Observable<posts.Posts> {
    return this.postsService.getPostsStream(paginationDto);
  }
}
