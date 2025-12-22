//subscription.controller
import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { SubscriptionsService } from "./subscription.service";
import { AuthGuard } from "../../guards/auth.guard";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { PurchaseSubscriptionDto } from "./dto/purchase-subscription.dto";

@ApiTags("Subscriptions")
@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly service: SubscriptionsService) {}

  @Get("plans")
  @ApiOperation({ summary: "Get all subscription plans" })
  getPlans() {
    return this.service.getPlans();
  }

  @Post("purchase")
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Obuna sotib olish" })
  async purchase(@Req() req, @Body() dto: PurchaseSubscriptionDto) {
    const result = await this.service.purchase(req.user.sub, dto.planId);
    return {
      success: true,
      message: "Obuna muvaffaqiyatli sotib olindi",
      data: result
    };
  }
}
