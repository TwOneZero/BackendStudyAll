import { Exclude, Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import MyBaseEntity from './Entity';
import bcrypt, { compare } from 'bcryptjs';
import { User } from './User';
import { Sub } from './Sub';
import { Post } from './Post';
import { makeId, slugify } from '../utils/helpers';
import { Comment } from './Comment';

@Entity('votes')
export class Vote extends MyBaseEntity {
  @Column()
  value: number;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => Post, (post) => post.votes)
  post: Post;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne(() => Comment)
  comment: Comment;
}
