import { Body, Controller, Get } from '@nestjs/common';
import { LikesDto } from './dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private likeService: LikesService) {}

  @Get('/')
  async getNumberOfLikesOfaPost(@Body() req: LikesDto) {
    return this.likeService.getNumberOfLikesOfaPost(req);
  }
}
