import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID
} from "class-validator";

export class CreateMovieDto {
  @ApiProperty({ example: "Qasoskorlar" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "Film haqida batafsil ma'lumot" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  releaseYear: number;

  @ApiProperty({ example: 120 })
  @IsInt()
  durationMinutes: number;

  @ApiProperty({ enum: ["free", "premium"], default: "free" })
  @IsEnum(["free", "premium"])
  subscriptionType: "free" | "premium";

  @ApiProperty({
    example: ["uuid-1", "uuid-2"],
    description: "Kategoriya IDlari ro'yxati"
  })
  @IsArray()
  @IsUUID("4", { each: true })
  categoryIds: string[];

  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Kino posteri"
  })
  poster: any;
}
