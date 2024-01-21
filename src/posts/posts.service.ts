import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { User } from "src/auth/entities/user.entity";
import { Post } from "./entities/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}
  async createPost(createPostDto: CreatePostDto, user: User) {
    try {
      const post = await this.postRepository.create({
        ...createPostDto,
        author: user,
      });

      await this.postRepository.save(post);
      return post;
    } catch (error) {
      this.handleException(error);
    }
    return "This action adds a new post";
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const posts = await this.postRepository.find({
      take: limit,
      skip: offset,
      relations: {
        author: true,
      },
    });
    return posts;
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) throw new NotFoundException(`Post with ID: ${id} not found`);

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, user: User) {
    try {
      const post = await this.postRepository.preload({ id, ...updatePostDto });
      if (!post) throw new NotFoundException(`Post with id: ${id} not found`);
      post.author = user;
      await this.postRepository.save(post);
      return post;
    } catch (error) {
      this.handleException(error);
    }

    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    const post = await this.postRepository.findOneBy({ id });
    console.log(post);
    if (!post) throw new NotFoundException(`Post with id: ${id} not found`);
    await this.postRepository.remove(post);
    return `Post with id: ${id} removed`;
  }
  async findPostsByUser(userId: string) {
    const posts = await this.postRepository.find({
      where: { author: { id: userId } },
    });

    return posts;
  }

  private handleException(error: any) {
    if (error.code === "23505") throw new BadGatewayException(error.detail);
    // this.logger.error(error);
    throw new InternalServerErrorException(
      "Unexpected error occurred, check server logs"
    );
  }
}
