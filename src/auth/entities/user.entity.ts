import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  email: string;

  @Column("text", { select: false })
  password: string;

  @Column("text")
  fullName: string;

  @Column("bool", { default: true })
  isActive: boolean;

  @Column("bool", { default: false })
  isAdmin: boolean;

  @OneToMany(() => Post, (post) => post.author)
  post: Post;
}
