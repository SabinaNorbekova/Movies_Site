import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const movieSlug = request.params.slug;

    if (!user) throw new UnauthorizedException("Tizimga kirmagansiz");

    const movie = await this.prisma.movie.findUnique({
      where: { slug: movieSlug }
    });

    if (!movie) return true; 
    if (movie.subscriptionType === "free") return true;

    const activeSub = await this.prisma.userSubscription.findFirst({
      where: {
        userId: user.sub,
        status: "active",
        endDate: { gte: new Date() }
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
