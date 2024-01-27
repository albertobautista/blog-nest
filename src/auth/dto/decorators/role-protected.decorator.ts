import { SetMetadata } from "@nestjs/common";

export const META_ROLE = "role";

export const RoleProtected = (isAdmin: boolean) => {
  return SetMetadata(META_ROLE, isAdmin);
};
