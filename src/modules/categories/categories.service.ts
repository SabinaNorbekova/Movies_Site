import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; slug: string; description: string }) {
    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async remove(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
