//premium.guard
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // AuthGuard dan kelgan foydalanuvchi
    const movieSlug = request.params.slug;

    const movie = await this.prisma.movie.findUnique({
      where: { slug: movieSlug }
    });

    // Agar kino bepul bo'lsa, hamma ko'rishi mumkin
    if (!movie || movie.subscriptionType === "free") return true;

    // Agar premium bo'lsa, foydalanuvchining faol obunasi borligini tekshiramiz
    const activeSub = await this.prisma.userSubscription.findFirst({
      where: {
        userId: user.sub,
        status: "active",
        endDate: { gte: new Date() } // Muddati tugamagan bo'lishi kerak
      }
    });

    if (!activeSub) {
      throw new ForbiddenException(
        "Bu premium kino. Ko'rish uchun obuna sotib oling."
      );
    }

    return true;
  }
}
