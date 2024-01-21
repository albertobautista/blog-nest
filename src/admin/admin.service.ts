import { Injectable } from "@nestjs/common";

import { AuthService } from "src/auth/auth.service";
import { Repository } from "typeorm";
import { User } from "src/auth/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAllUsers() {
    const users = this.userRepository.find();
    return users;
  }
}
