import { IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  content: string;
}
