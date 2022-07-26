import { IsNumber } from 'class-validator';

export class LikesDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  post_id: number;
}
