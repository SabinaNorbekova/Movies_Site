import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { AuthGuard } from "../../guards/auth.guard";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { WatchHistoryDto } from "./dto/watch-history.dto";

@ApiTags("Movies")
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: "Barcha kinolar ro'yxati (Filtrlar bilan)" })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(":slug")
  @ApiOperation({ summary: "Kino haqida batafsil ma'lumot" })
  findOne(@Param("slug") slug: string) {
    return this.moviesService.findBySlug(slug);
  }

  @Post(":id/watch")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Kino ko'rishni boshlash (Tarixga yozish)" })
  async watchMovie(
    @Req() req: any,
    @Param("id") movieId: string,
    @Body() body: WatchHistoryDto 
  ) {
    return this.moviesService.updateWatchHistory(req.user.sub, movieId, body);
  }
}
