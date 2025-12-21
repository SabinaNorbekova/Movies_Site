import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { AuthGuard } from "../../guards/auth.guard";
import { RoleGuard } from "../../guards/role.guard";
import { UserRoles } from "../../decorators/role.decorator";
import { Roles } from "../../decorators/role.enum";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Admin Paneli")
@Controller("admin/movies")
@UseGuards(AuthGuard, RoleGuard)
@UserRoles(Roles.ADMIN, Roles.SUPERADMIN)
@ApiBearerAuth()
export class AdminMoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOperation({ summary: "All movies for admin" })
  async getAdminMovies() {
    return this.moviesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Add new movie (Multipart)" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("poster"))
  async create(@Req() req: any, @Body() body: any, @UploadedFile() file: any) {
    const movieData = { ...body, posterUrl: file?.path || "" };
    return this.moviesService.create(req.user.sub, movieData);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Movie" })
  async remove(@Param("id") id: string) {
    return { success: true, message: "Movie deleted succesfully" };
  }
}
