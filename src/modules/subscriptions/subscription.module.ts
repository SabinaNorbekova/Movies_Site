//subscription.module
import { Module } from "@nestjs/common";
import { SubscriptionsService } from "./subscription.service";
import { SubscriptionsController } from "./subscription.controller";

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService]
})
export class SubscriptionsModule {}
