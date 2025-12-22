//categories/dto/create-category.dto
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: "Jangari" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "action" })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: "Qiziqarli jangari kinolar to'plami" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
