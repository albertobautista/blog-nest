import { Controller, Delete, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Auth } from "src/auth/dto/decorators/auth.decorator";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  @Auth({ isAdmin: true })
  findAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Delete("users/:id")
  @Auth({ isAdmin: true })
  removeUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminService.removeUser(id);
  }

  @Get("posts")
  @Auth({ isAdmin: true })
  findAllPosts() {
    return this.adminService.findAllPosts();
  }
}
