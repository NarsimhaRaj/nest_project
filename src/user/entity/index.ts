import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('USERS')
export class User {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id?: number;

  @Column({ name: 'FIRST_NAME' })
  firstName: string;

  @Column({ name: 'LAST_NAME' })
  lastName: string;
}
