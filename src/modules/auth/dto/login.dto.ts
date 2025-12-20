import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "alijon@example.com",
    description: "Foydalanuvchi emaili"
  })
  @IsEmail({}, { message: "Email formati noto'g'ri" })
  email: string;

  @ApiProperty({ example: "12345678", description: "Foydalanuvchi paroli" })
  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  password: string;
}
