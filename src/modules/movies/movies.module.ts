import { Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { AdminMoviesController } from "./admin-movies.controller";
import { FileUploadModule } from "../file-upload/file-upload.module";

@Module({
  imports: [FileUploadModule],
  controllers: [MoviesController, AdminMoviesController],

  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
