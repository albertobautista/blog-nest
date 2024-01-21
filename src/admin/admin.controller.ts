import { Controller, Delete, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  findAll() {
    return this.adminService.findAllUsers();
  }

  @Delete("users/:id")
  removeUser(@Param("id", ParseUUIDPipe) id: string) {
    return this.adminService.removeUser(id);
  }
}
