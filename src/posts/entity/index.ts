import { User } from 'src/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('POSTS')
export class Posts {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'CONTENT' })
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'USER_ID' }])
  userId: number;
}
