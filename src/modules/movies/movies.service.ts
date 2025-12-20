import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: any) {
    return this.prisma.movie.create({
      data: {
        title: dto.title,
        slug: dto.title.toLowerCase().split(" ").join("-"),
        description: dto.description,
        releaseYear: Number(dto.releaseYear),
        durationMinutes: Number(dto.durationMinutes),
        posterUrl: dto.posterUrl || "",
        rating: Number(dto.rating) || 0,
        subscriptionType: dto.subscriptionType || "free",
        createdByUserId: userId
      }
    });
  }

  async findAll() {
    return this.prisma.movie.findMany({
      include: { movieCategories: { include: { category: true } } }
    });
  }

  async findBySlug(slug: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { slug },
      include: { movieFiles: true, reviews: true }
    });
    if (!movie) throw new NotFoundException("Kino topilmadi");
    return movie;
  }
}
