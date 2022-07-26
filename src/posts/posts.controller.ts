import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/authguard/auth.guard';
import { PostDto } from './dto';
import { PostsService } from './posts.service';

@Controller('/posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get('/:id')
  async getNumberOfLikesOfaPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getAllPostsById(id);
  }

  @Post('/createPost')
  async createAPost(
    @Body() req: PostDto,
    @Session() session: Record<string, any>,
  ) {
    return this.postService.createAPost(req, session);
  }
}
