import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "src/auth/guards/user-role.guard";
import { RoleProtected } from "./role-protected.decorator";

export function Auth({ isAdmin }: { isAdmin: boolean }) {
  return applyDecorators(
    RoleProtected(isAdmin),
    UseGuards(AuthGuard(), UserRoleGuard)
  );
}
