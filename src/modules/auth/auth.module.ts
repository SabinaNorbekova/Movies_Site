//auth.module
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../../prisma/prisma.module";
import { MailerModule } from "../../mailer/mailer.module"; 

@Module({
  imports: [
    PrismaModule,
    MailerModule, 
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
