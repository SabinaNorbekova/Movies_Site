import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Token topilmadi");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw new UnauthorizedException("Noto'g'ri token formati");
    }

    try {
      const checkToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_SECRET
      });
      req.user = checkToken;
      return true; 
    } catch (error) {
      throw new UnauthorizedException("Token yaroqsiz yoki muddati o'tgan");
    }
  }
}
