import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { GetUser } from "./dto/decorators/get-user.decorator";
import { User } from "./entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post("login")
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.authService.findUser(id);
  }
  @Patch(":id")
  // @Auth(ValidRoles.admin)
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  // @Auth(ValidRoles.admin)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.authService.deleteUser(id);
  }
}
