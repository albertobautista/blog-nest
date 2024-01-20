import { IsArray, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(5)
  content: string;

  @IsString({ each: true })
  @IsArray()
  categories: string[];
}
