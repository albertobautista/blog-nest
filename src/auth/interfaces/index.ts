export interface JwtPayload {
  id: string;
}

export enum ValidRoles {
  admin = "admin",
  superUser = "super-user",
  user = "user",
}
