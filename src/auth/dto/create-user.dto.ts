import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "The email of the user",
    example: "test@test.com",
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "The full name of the user",
    example: "John Doe",
  })
  @IsString()
  @MinLength(5)
  fullName: string;

  @ApiProperty({
    description: "The password of the user",
    example: "Test123456",
  })
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "The password must have a Uppercase, lowercase letter and a number",
  })
  password: string;

  @ApiProperty({
    description: "Set if user is admin or not",
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
