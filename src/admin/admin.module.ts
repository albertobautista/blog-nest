import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { PostsModule } from "src/posts/posts.module";
import { Post } from "src/posts/entities/post.entity";

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([User, Post]), AuthModule, PostsModule],
})
export class AdminModule {}
