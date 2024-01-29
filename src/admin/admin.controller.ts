import { Controller, Delete, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Auth } from "src/auth/dto/decorators/auth.decorator";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users (protected)" })
  @Auth({ isAdmin: true })
  findAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Delete("users/:id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete user by ID (protected)" })
  @Auth({ isAdmin: true })
  removeUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminService.removeUser(id);
  }

  @Get("posts")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all posts (protected)" })
  @Auth({ isAdmin: true })
  findAllPosts() {
    return this.adminService.findAllPosts();
  }
}
