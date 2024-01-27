import { UseGuards, applyDecorators } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";

import { SameUserGuard } from "src/auth/guards/same-user.guard";

export function SameUser() {
  return applyDecorators(UseGuards(AuthGuard(), SameUserGuard));
}
