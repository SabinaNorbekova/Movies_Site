//subscription.controller
import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { SubscriptionsService } from "./subscription.service";
import { AuthGuard } from "../../guards/auth.guard";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

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
  @ApiOperation({ summary: "Buy subscription" })
  purchase(@Req() req: any, @Body() body: { planId: string }) {
    return this.service.purchase(req.user.sub, body.planId);
  }
}
