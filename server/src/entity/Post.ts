import { Exclude, Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import MyBaseEntity from './Entity';
import bcrypt from 'bcryptjs';
import { User } from './User';
import { Sub } from './Sub';
import { makeId, slugify } from '../utils/helpers';
import { Vote } from './Vote';
import { Comment } from './Comment';

@Entity('posts')
export class Post extends MyBaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Column()
  title: string;

  @Index()
  @Column()
  slug: string;

  @Column({ nullable: true, type: 'text' })
  body: string;

  @Column()
  subname: string;

  @Column()
  username: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne(() => Sub, (sub) => sub.posts)
  @JoinColumn({ name: 'subname', referencedColumnName: 'name' })
  sub: Sub;

  @Exclude()
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @Expose() get url(): string {
    return `/r/${this.subname}/${this.identifier}/${this.slug}`;
  }

  @Expose() get commentCount(): number {
    return this.comments?.length;
  }
  @Expose() get voteScore(): number {
    return this.votes?.reduce((memo, curt) => memo + (curt.value || 0), 0);
  }

  protected userVote: number;

  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @BeforeInsert()
  makeIdAndSlug() {
    this.identifier = makeId(7);
    this.slug = slugify(this.title);
  }
}
