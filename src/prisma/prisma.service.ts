//prisma.service
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger("PrismaService");

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      console.error("XATO: .env faylidan DATABASE_URL o'qib bo'lmadi!");
    }

    const pool = new Pool({
      connectionString
    });
    const adapter = new PrismaPg(pool);

    super({
      adapter: adapter as any, 
      log: ["error", "warn"]
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Prisma connected muvaffaqiyatli!");
    } catch (error) {
      this.logger.error("Ulanishda xato: " + error.message);
      process.exit(1);
    }
  }
}
