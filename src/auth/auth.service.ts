import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces";
import { isUUID } from "class-validator";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...restUserData } = createUserDto;

      const newUser = this.userRepository.create({
        ...restUserData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(newUser);
      delete newUser.password;

      return newUser;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException("Invalid credentials");

    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  async findAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
  async findUser(id: string) {
    let user: User;

    user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with ID: ${id} not found`);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { password, ...toUpdate } = updateUserDto;

      const user = await this.userRepository.preload({ id, ...toUpdate });

      if (!user)
        throw new NotFoundException(`Product with id: ${id} not found`);

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.log(error);
      this.handleDBErrors(error);
    }
  }

  async deleteUser(id: string) {
    const product = await this.findUser(id);

    await this.userRepository.remove(product);
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  private handleDBErrors(error: any): never {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      "Something went wrong, please try again later"
    );
  }
}
