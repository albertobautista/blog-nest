import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @ApiProperty({
    description: "The title of the post",
    example: "My first post",
    nullable: false,
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  title: string;

  @ApiProperty({
    description: "The content of the post",
    example: "This is the content of my first post",
    nullable: false,
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  content: string;

  @ApiProperty({
    description: "The categories of the post",
    example: ["Comedy", "Tecnology"],
    nullable: false,
    minLength: 1,
    isArray: true,
  })
  @IsString({ each: true })
  @IsArray()
  categories: string[];
}
