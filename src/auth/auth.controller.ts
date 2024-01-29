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
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Login a user" })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Get("users")
  @ApiOperation({ summary: "Get all users" })
  findAllUsers() {
    return this.authService.findAllUsers();
  }
  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.authService.findUser(id);
  }
  @Put(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user by ID" })
  @Auth({ isAdmin: true })
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete user by ID" })
  @Auth({ isAdmin: true })
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.authService.deleteUser(id);
  }
}
