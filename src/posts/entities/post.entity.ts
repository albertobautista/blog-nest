import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  title: string;

  @Column("text")
  content: string;

  @Column({
    type: "text",
    array: true,
    default: [],
  })
  categories: string[];

  @ManyToOne(() => User, (user) => user.post, { eager: true })
  author: User;
}
