import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class WatchHistoryDto {
  @ApiProperty({ example: 120, description: "Ko'rilgan daqiqa" })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 45.5, description: "Ko'rilgan foiz" })
  @IsNumber()
  percentage: number;
}
