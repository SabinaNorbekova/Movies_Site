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
  UploadedFile,
  BadRequestException
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
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UploadMovieFileDto } from "./dto/upload-movie-file.dto";
import { CloudinaryService } from "nestjs-cloudinary";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Admin Paneli")
@Controller("admin/movies")
@UseGuards(AuthGuard, RoleGuard)
@UserRoles(Roles.ADMIN, Roles.SUPERADMIN)
@ApiBearerAuth()
export class AdminMoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get()
  @ApiOperation({ summary: "Admin uchun barcha kinolar" })
  async getAdminMovies() {
    return this.moviesService.findAll();
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Yangi kino qo'shish" })
  @UseInterceptors(FileInterceptor("poster"))
  async create(
    @Req() req: any,
    @Body() dto: CreateMovieDto,
    @UploadedFile() file: any
  ) {
    let posterUrl = "";
    if (file) {
      const upload = await this.cloudinaryService.uploadFile(file);
      posterUrl = upload.url;
    }
    return this.moviesService.create(req.user.sub, { ...dto, posterUrl });
  }

  @Put(":id")
  @ApiOperation({ summary: "Kinoni tahrirlash" })
  async update(@Param("id") id: string, @Body() dto: CreateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Kinoni o'chirish" })
  async remove(@Param("id") id: string) {
    await this.moviesService.remove(id);
    return { success: true, message: "Kino muvaffaqiyatli o'chirildi" };
  }

  @Post(":movie_id/files")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Kinoga video fayl yuklash" })
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @Param("movie_id") movieId: string,
    @Body() dto: UploadMovieFileDto,
    @UploadedFile() file: any
  ) {
    if (!file) throw new BadRequestException("Fayl tanlanmagan!");
    const uploadResult = await this.cloudinaryService.uploadFile(file);
    return this.moviesService.addMovieFile(movieId, {
      fileUrl: uploadResult.url,
      quality: dto.quality,
      language: dto.language
    });
  }
}
