//profile/dto/update-frofile.dto
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateProfileDto {
  @ApiProperty({ example: "Aliyev Valijon" })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({ example: "+998901234567" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: "Uzbekistan" })
  @IsString()
  @IsOptional()
  country?: string;
}
