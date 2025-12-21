//auth.controller
import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as express from "express";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/auth.guard";
import { VerifyOtpDto } from "./dto/verify-otp.dto";

@ApiTags("Authentification")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Registration" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("verify-otp")
  @ApiOperation({ summary: "Verify-otp" })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto.email, dto.otp);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Sign in" })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response
  ) {
    const result = await this.authService.login(dto);
    res.cookie("auth_token", result.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    return {
      ...result.response,
      token: result.token
    }
  }

  @Post("logout")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: express.Response) {
    res.clearCookie("auth_token");
    return { success: true, message: "Logout succesfully" };
  }
}
