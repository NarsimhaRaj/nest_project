import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities';
import { EntityManager, Repository } from 'typeorm';
import { PostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    private entityManager: EntityManager,
    @InjectRepository(Posts)
    private postRepo: Repository<Posts>,
  ) {}

  getAllPostsById = async (userId) => {
    const [data, count] = await Promise.all([
      this.entityManager.query('SELECT * FROM POSTS WHERE USER_ID = ?', [
        userId,
      ]),
      this.entityManager.query(
        'SELECT COUNT(*) as totalCount FROM POSTS WHERE USER_ID = ?',
        [userId],
      ),
    ]);
    return {
      data,
      count,
    };
  };

  createAPost = async (req: PostDto, session: Record<string, any>) => {
    try {
      console.log(session);
      const res = await this.postRepo.save({
        content: req.content,
        userId: session.userId,
      });
      return { isSuccess: true };
    } catch (err) {
      throw new InternalServerErrorException({ isSuccess: false });
    }
  };
}
