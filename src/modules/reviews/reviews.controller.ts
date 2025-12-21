import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { AuthGuard } from "../../guards/auth.guard";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Reviews")
@Controller("movies")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(":movie_id/reviews")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Add a review to this movie" })
  create(
    @Req() req: any,
    @Param("movie_id") movie_id: string,
    @Body() dto: CreateReviewDto
  ) {
    return this.reviewsService.create(req.user.sub, movie_id, dto);
  }

  @Delete(":movie_id/reviews/:review_id")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete review" })
  remove(@Req() req: any, @Param("review_id") review_id: string) {
    return this.reviewsService.remove(review_id, req.user.sub);
  }
}
