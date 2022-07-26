import { Posts, User } from 'src/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('LIKES')
export class Likes {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'USER_ID' })
  userId: number;

  @ManyToOne(() => Posts, (post) => post.id)
  @JoinColumn({ name: 'POST_ID' })
  postId: number;
}
