//categories.controller
import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../../guards/auth.guard";
import { RoleGuard } from "../../guards/role.guard";
import { UserRoles } from "../../decorators/role.decorator";
import { Roles } from "../../decorators/role.enum";
import { CreateCategoryDto } from "./dto/create-category.dto";

@ApiTags("Catigories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBearerAuth()
  @UserRoles(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: "Create new category (Admin only)" })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  findAll() {
    return this.categoriesService.findAll();
  }
}
