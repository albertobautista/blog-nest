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
import { META_ROLE } from "../dto/decorators/role-protected.decorator";

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Get the metadata roles array
    const isAdminRole: boolean = this.reflector.get<boolean>(
      META_ROLE,
      context.getHandler()
    );

    if (!isAdminRole) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException("User not found");

    if (isAdminRole) {
      if (user.isAdmin) return true;
    }

    throw new ForbiddenException(
      "You do not have permission to access this resource"
    );
  }
}
