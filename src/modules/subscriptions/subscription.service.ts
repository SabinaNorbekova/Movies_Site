// subscription.service
import { Injectable, NotFoundException } from "@nestjs/common"; 
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async getPlans() {
    return this.prisma.subscriptionPlan.findMany({ where: { isActive: true } });
  }

  async purchase(userId: string, planId: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      throw new NotFoundException("Bunday obuna rejasi topilmadi");
      }
      
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    return this.prisma.userSubscription.create({
      data: {
        userId,
        planId: plan.id,
        startDate: new Date(),
        endDate,
        status: "active"
      }
    });
  }
}
