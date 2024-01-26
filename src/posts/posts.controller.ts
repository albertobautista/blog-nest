import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { GetUser } from "src/auth/dto/decorators/get-user.decorator";
import { User } from "src/auth/entities/user.entity";
import { Auth } from "src/auth/dto/decorators/auth.decorator";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth()
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.createPost(createPostDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(":id")
  @Auth()
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User
  ) {
    console.log(user);
    return this.postsService.update(id, updatePostDto, user);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }

  @Get("user/:userId")
  findPostsByUser(@Param("userId", ParseUUIDPipe) userId: string) {
    return this.postsService.findPostsByUser(userId);
  }

  @Get("search/:term")
  searchPorductsByTerm(
    @Query() paginationDto: PaginationDto,
    @Param("term") term: string
  ) {
    return this.postsService.searchPostsByTerm(paginationDto, term);
  }
}
