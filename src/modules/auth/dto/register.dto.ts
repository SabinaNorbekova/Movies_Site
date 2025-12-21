//auth.registr.dto
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "alijon", description: "Foydalanuvchi nomi" })
  @IsString()
  username: string;

  @ApiProperty({ example: "alijon@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "12345678", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
