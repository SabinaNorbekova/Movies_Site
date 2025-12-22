import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>("roles", [
      context.getHandler(),
      context.getClass()
    ]);

    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user || !user.role) {
      throw new ForbiddenException("Foydalanuvchi roli aniqlanmadi");
    }

    const hasRole = roles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        "Sizda ushbu amalni bajarish uchun ruxsat yo'q"
      );
    }

    return true;
  }
}
