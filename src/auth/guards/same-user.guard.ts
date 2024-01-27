import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../entities/user.entity";

@Injectable()
export class SameUserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const params = req.params;
    const user = req.user as User;

    if (!user) throw new BadRequestException("User not found");

    if (user && params && params.id && params.id === user.id) {
      return true;
    }

    throw new ForbiddenException(
      "You do not have permission to access this resource"
    );
  }
}
