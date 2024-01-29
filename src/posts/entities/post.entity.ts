import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Post {
  @ApiProperty({
    description: "The id of the post",
    example: "123e4567-e89b-12d3-a456-426614174000",
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "The title of the post",
    example: "My first post",
    nullable: false,
    minLength: 5,
  })
  @Column("text", { unique: true })
  title: string;

  @ApiProperty({
    description: "The content of the post",
    example: "This is the content of my first post",
    nullable: false,
    minLength: 5,
  })
  @Column("text")
  content: string;

  @ApiProperty({
    description: "The categories of the post",
    example: ["Comedy", "Tecnology"],
    nullable: false,
    minLength: 1,
    isArray: true,
  })
  @Column({
    type: "text",
    array: true,
    default: [],
  })
  categories: string[];

  @ApiProperty({
    description: "The author of the post",
    example: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      username: "user",
      email: "test@test.com",
    },
    nullable: false,
  })
  @ManyToOne(() => User, (user) => user.post, {
    eager: true,
    onDelete: "CASCADE",
  })
  author: User;
}
