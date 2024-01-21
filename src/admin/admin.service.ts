import { Injectable, NotFoundException } from "@nestjs/common";

import { AuthService } from "src/auth/auth.service";
import { Repository } from "typeorm";
import { User } from "src/auth/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/posts/entities/post.entity";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) {}

  async findAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }
  async removeUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    console.log(user);

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    await this.userRepository.remove(user);

    return `User with id: ${id} removed`;
  }

  async findAllPosts() {
    const posts = await this.postsRepository.find();
    return posts;
  }
}
