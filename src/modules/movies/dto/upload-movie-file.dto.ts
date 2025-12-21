import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UploadMovieFileDto {
  @ApiProperty({ enum: ["240p", "360p", "480p", "720p", "1080p", "4K"] })
  @IsEnum(["240p", "360p", "480p", "720p", "1080p", "4K"])
  quality: string;

  @ApiProperty({ example: "uz", default: "uz" })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({ type: "string", format: "binary" })
  file: any;
}
