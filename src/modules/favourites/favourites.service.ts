//favourites.service
import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: { movie: true }
    });
    return {
      success: true,
      data: {
        movies: favorites.map((f) => f.movie),
        total: favorites.length
      }
    };
  }

  async create(userId: string, movieId: string) {
    const exists = await this.prisma.favorite.findUnique({
      where: { userId_movieId: { userId, movieId } }
    });
    if (exists)
      throw new BadRequestException("Bu kino allaqachon sevimlilar ro'yxatida");

    const fav = await this.prisma.favorite.create({
      data: { userId, movieId },
      include: { movie: { select: { title: true } } }
    });

    return {
      success: true,
      message: "Kino sevimlilar ro'yxatiga qo'shildi",
      data: {
        id: fav.id,
        movie_id: fav.movieId,
        movie_title: fav.movie.title,
        created_at: fav.createdAt
      }
    };
  }

  async remove(userId: string, movieId: string) {
    await this.prisma.favorite.delete({
      where: { userId_movieId: { userId, movieId } }
    });
    return { success: true, message: "Kino sevimlilar ro'yxatidan o'chirildi" };
  }
}
