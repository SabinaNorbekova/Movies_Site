import { BadRequestException, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FileUploadController } from "./file-upload.controller";
import { CloudinaryModule } from "nestjs-cloudinary"; 
import * as multer from "multer";

@Module({
  imports: [
    CloudinaryModule.forRoot({
      isGlobal: true,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    }),
    MulterModule.register({
      storage: multer.memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/(^image|video)\//)) {
          return cb(
            new BadRequestException("Faqat rasm va videolar ruxsat etiladi"),
            false
          );
        }
        cb(null, true);
      }
    })
  ],
  controllers: [FileUploadController],
  exports: [CloudinaryModule]
})
export class FileUploadModule {}
