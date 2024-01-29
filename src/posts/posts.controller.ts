import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Put,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { GetUser } from "src/auth/dto/decorators/get-user.decorator";
import { User } from "src/auth/entities/user.entity";
import { Auth } from "src/auth/dto/decorators/auth.decorator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a post" })
  @Auth({ isAdmin: false })
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.createPost(createPostDto, user);
  }

  @Get()
  @ApiOperation({ summary: "Get all posts with pagination" })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
    description: "Limit of posts in the response",
  })
  @ApiQuery({
    name: "offset",
    type: Number,
    required: false,
    description: "Offset of posts in the response",
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get post by ID" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Put(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update post" })
  @Auth({ isAdmin: true })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User
  ) {
    console.log(user);
    return this.postsService.update(id, updatePostDto, user);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete post by ID" })
  @Auth({ isAdmin: true })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }

  @Get("user/:userId")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get posts by user ID" })
  findPostsByUser(@Param("userId", ParseUUIDPipe) userId: string) {
    return this.postsService.findPostsByUser(userId);
  }

  @Get("search/:term")
  @ApiOperation({ summary: "Search posts by term" })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
    description: "Limit of posts in the response",
  })
  @ApiQuery({
    name: "offset",
    type: Number,
    required: false,
    description: "Offset of posts in the response",
  })
  searchPorductsByTerm(
    @Query() paginationDto: PaginationDto,
    @Param("term") term: string
  ) {
    return this.postsService.searchPostsByTerm(paginationDto, term);
  }
}
