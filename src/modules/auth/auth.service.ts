//auth.service
import {
  Injectable,
  BadRequestException,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "../../mailer/mailer.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

const otpStore = new Map<string, { otp: number; data: any; expires: number }>();

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });
    if (existingUser) throw new BadRequestException("This email already exist");

    const otpCode = Math.floor(100000 + Math.random() * 900000);

    // Xotirada 5 minutga saqlash
    otpStore.set(dto.email, {
      otp: otpCode,
      data: dto,
      expires: Date.now() + 5 * 60 * 1000
    });

    try {
      await this.mailerService.sendEmail(dto.email, "Tasdiqlash kodi", otpCode);
    } catch (e) {
      console.log("Email yuborishda xato:", e.message);
    }

    return {
      success: true,
      message: "Otp emailga yuborildi",
      email: dto.email
    };
  }

  async verifyOtp(email: string, otp: number) {
    const record = otpStore.get(email);

    if (!record || record.expires < Date.now()) {
      otpStore.delete(email);
      throw new BadRequestException("Otp muddati o'tgan yoki topilmadi");
    }

    if (record.otp !== otp) {
      throw new BadRequestException("Kod noto'g'ri");
    }

    const { data } = record;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: hashedPassword,
        
        profile: {
          create: {
            fullName: data.username, 
            phone: "",
            country: ""
          }
        }
      }
    });

    otpStore.delete(email); 

    return {
      success: true,
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
      user_id: user.id
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        userSubscriptions: {
          include: { plan: true },
          where: { status: "active" }
        }
      }
    });

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role
    });
    const activeSub = user.userSubscriptions[0];

    return {
      token,
      response: {
        success: true,
        message: "Muvaffaqiyatli kirildi",
        data: {
          user_id: user.id,
          username: user.username,
          role: user.role,
          subscription: {
            plan_name: activeSub ? activeSub.plan.name : "Free",
            expires_at: activeSub ? activeSub.endDate : null
          }
        }
      }
    };
  }
}
