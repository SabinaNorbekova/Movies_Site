//profile.module
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { user: { select: { avatarUrl: true } } }
    });
    if (!profile) throw new NotFoundException("Profil topilmadi");

    return {
      success: true,
      data: {
        user_id: profile.userId,
        full_name: profile.fullName,
        phone: profile.phone,
        country: profile.country,
        created_at: profile.createdAt,
        avatar_url: profile.user.avatarUrl
      }
    };
  }

  async update(userId: string, dto: UpdateProfileDto) {
    const updated = await this.prisma.profile.update({
      where: { userId },
      data: {
        fullName: dto.full_name,
        phone: dto.phone,
        country: dto.country
      }
    });
    return {
      success: true,
      message: "Profil muvaffaqiyatli yangilandi",
      data: {
        user_id: updated.userId,
        full_name: updated.fullName,
        phone: updated.phone,
        country: updated.country,
        updated_at: new Date()
      }
    };
  }
}
