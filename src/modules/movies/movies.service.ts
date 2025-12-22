//movies.service
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

  async update(id: string, dto: any) {
    const { categoryIds, ...movieData } = dto;

    return this.prisma.movie.update({
      where: { id },
      data: {
        title: movieData.title,
        description: movieData.description,
        subscriptionType: movieData.subscriptionType,
    
        ...(categoryIds && {
          movieCategories: {
            deleteMany: {}, 
            create: categoryIds.map((catId: string) => ({ categoryId: catId })) 
          }
        })
      }
    });
  }

  async remove(id: string) {
    return this.prisma.movie.delete({ where: { id } });
  }

  async addMovieFile(
    movieId: string,
    data: { fileUrl: string; quality: any; language: string }
  ) {
    // Avval kino borligini tekshiramiz
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId }
    });
    if (!movie) throw new NotFoundException("Kino topilmadi");

    return this.prisma.movieFile.create({
      data: {
        movieId: movieId,
        fileUrl: data.fileUrl,
        quality: data.quality,
        language: data.language
      }
    });
  }

  async updateWatchHistory(
    userId: string,
    movieId: string,
    body: { duration: number; percentage: number }
  ) {
    return this.prisma.watchHistory.upsert({
      where: { userId_movieId: { userId, movieId } },
      update: {
        watchedDuration: body.duration,
        watchedPercentage: body.percentage,
        lastWatched: new Date()
      },
      create: {
        userId,
        movieId,
        watchedDuration: body.duration,
        watchedPercentage: body.percentage
      }
    });
  }
}
