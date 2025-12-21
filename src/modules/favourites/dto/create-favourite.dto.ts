//favourites/dto/create-favourite.dto
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsNotEmpty } from "class-validator";

export class CreateFavouriteDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440021",
    description: "Kino IDsi (UUID)"
  })
  @IsUUID()
  @IsNotEmpty()
  movie_id: string;
}
