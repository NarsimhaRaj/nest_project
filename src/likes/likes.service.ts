import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(private entityManager: EntityManager) {}

  getNumberOfLikesOfaPost = async (postId) => {
    const data = await this.entityManager.query(
      'SELECT COUNT(*) as totalCount FROM LIKES WHERE POST_ID = ?',
      [postId],
    );
    return {
      data,
    };
  };
}
