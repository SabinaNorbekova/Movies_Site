//auth/verify-otp
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber } from "class-validator";

export class VerifyOtpDto {
  @ApiProperty({
    example: "test@gmail.com",
    description: "Foydalanuvchi emaili"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 123456,
    description: "Emailga yuborilgan 6 talik kod"
  })
  @IsNumber()
  otp: number;
}
