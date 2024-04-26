import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userEmail: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (posts) => posts.user, {
    nullable: true,
  })
  posts: Post[];
}
