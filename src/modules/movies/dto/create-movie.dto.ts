//movies/dto/create-movie.dto
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID
} from "class-validator";
import { Type, Transform } from "class-transformer";

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
  @Type(() => Number)
  @IsInt()
  releaseYear: number;

  @ApiProperty({ example: 120 })
  @Type(() => Number) 
  @IsInt()
  durationMinutes: number;

  @ApiProperty({ enum: ["free", "premium"], default: "free" })
  @IsEnum(["free", "premium"])
  subscriptionType: "free" | "premium";

  @ApiProperty({
    example: ["uuid-1", "uuid-2"],
    description: "Kategoriya IDlari ro'yxati"
  })
  @Transform(({ value }) => {
    if (typeof value === "string") return value.split(",");
    return value;
  })
  @IsArray()
  @IsUUID("4", { each: true })
  categoryIds: string[];

  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Kino posteri",
    required: false
  })
  poster?: any;
}