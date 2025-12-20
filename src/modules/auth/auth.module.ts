import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../../prisma/prisma.module";
import { MailerModule } from "../../mailer/mailer.module"; // To'g'ri yo'lni yozing

@Module({
  imports: [
    PrismaModule,
    MailerModule, // Shuni qo'shish shart!
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_SECRET || "SECRET",
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
