import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PurchaseSubscriptionDto {
  @ApiProperty({ description: "Obuna rejasi UUID si" })
  @IsUUID()
  planId: string;
}
