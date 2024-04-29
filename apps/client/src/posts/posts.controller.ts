import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Observable } from 'rxjs';
import { posts } from '@app/common';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

interface IReqWithUser extends Request {
  user: posts.User;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(
    @Body() postCreateDto: posts.CreatePostWithUser,
    @Req() req: IReqWithUser,
  ): Observable<posts.Post> {
    const { user } = req;
    return this.postsService.createPost({ ...postCreateDto, user });
  }

  @Get()
  getPosts(): Observable<posts.Posts> {
    return this.postsService.getPosts();
  }

  @Get('post/:id')
  @UseInterceptors(GrpcToHttpInterceptor)
  findOnePost(@Param('id') id: string) {
    return this.postsService.findOnePost(id);
  }

  @Patch('post/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(GrpcToHttpInterceptor)
  updatePost(
    @Param('id') id: string,
    @Body() updatePost: posts.UpdatePostWithUserId,
    @Req() req: IReqWithUser,
  ) {
    const {
      user: { id: userId },
    } = req;
    return this.postsService.update(id, userId, updatePost);
  }

  @Delete('post/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(GrpcToHttpInterceptor)
  remove(@Param('id') id: string, @Req() req: IReqWithUser) {
    const {
      user: { id: userId },
    } = req;
    return this.postsService.remove(id, userId);
  }

  @Get('all-posts-stream')
  getAllPostsUsingStream() {
    return this.postsService.postStream();
  }
}
