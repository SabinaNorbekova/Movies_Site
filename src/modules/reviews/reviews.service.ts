//reviews.service
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, movieId: string, dto: any) {
    const review = await this.prisma.review.create({
      data: {
        userId,
        movieId,
        rating: dto.rating,
        comment: dto.comment
      },
      include: { user: { select: { username: true } } }
    });

    return {
      success: true,
      message: "Sharh muvaffaqiyatli qo'shildi",
      data: {
        id: review.id,
        user: { id: userId, username: review.user.username },
        movie_id: movieId,
        rating: review.rating,
        comment: review.comment,
        created_at: review.createdAt
      }
    };
  }

  async remove(reviewId: string, userId: string) {
    await this.prisma.review.delete({
      where: { id: reviewId, userId } 
    });
    return { success: true, message: "Sharh muvaffaqiyatli o'chirildi" };
  }
}
