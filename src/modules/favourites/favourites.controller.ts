import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req
} from "@nestjs/common";
import { FavouritesService } from "./favourites.service";
import { AuthGuard } from "../../guards/auth.guard";
import { CreateFavouriteDto } from "./dto/create-favourite.dto";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Favorites")
@Controller("favorites")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  @ApiOperation({ summary: "Sevimlilar ro'yxatini olish" })
  findAll(@Req() req: any) {
    return this.favouritesService.findAll(req.user.sub);
  }

  @Post()
  @ApiOperation({ summary: "Kinoni sevimlilarga qo'shish" })
  create(@Req() req: any, @Body() dto: CreateFavouriteDto) {
    return this.favouritesService.create(req.user.sub, dto.movie_id);
  }

  @Delete(":movie_id")
  @ApiOperation({ summary: "Kinoni sevimlilardan o'chirish" })
  remove(@Req() req: any, @Param("movie_id") movie_id: string) {
    return this.favouritesService.remove(req.user.sub, movie_id);
  }
}
