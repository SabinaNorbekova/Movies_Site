//movies.controller
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
import { RoleGuard } from "../../guards/role.guard";
import { UserRoles } from "../../decorators/role.decorator";
import { Roles } from "../../decorators/role.enum";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Movies")
@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiBearerAuth()
  @UserRoles(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: "Add a movie (Only admin)" })
  create(@Req() req: any, @Body() body: any) {
    return this.moviesService.create(req.user.sub, body);
  }

  @Get()
  @ApiOperation({ summary: "All Movies list" })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(":slug")
  @ApiOperation({ summary: "All informations about movie" })
  findOne(@Param("slug") slug: string) {
    return this.moviesService.findBySlug(slug);
  }
}
