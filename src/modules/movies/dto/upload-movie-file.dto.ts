import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UploadMovieFileDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Kino videosi"
  })
  file: any;

  @ApiProperty({
    enum: ["240p", "360p", "480p", "720p", "1080p", "4K"],
    example: "720p"
  })
  @IsEnum(["240p", "360p", "480p", "720p", "1080p", "4K"])
  quality: string;

  @ApiProperty({ example: "uz", default: "uz" })
  @IsString()
  @IsNotEmpty()
  language: string;
}
