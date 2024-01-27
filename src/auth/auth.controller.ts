import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { Auth } from "./dto/decorators/auth.decorator";
import { SameUser } from "./dto/decorators/same-user.decorator";

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

  @Get("users")
  findAllUsers() {
    return this.authService.findAllUsers();
  }
  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.authService.findUser(id);
  }
  @Put(":id")
  @Auth({ isAdmin: true })
  @SameUser()
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @Auth({ isAdmin: true })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.authService.deleteUser(id);
  }
}
