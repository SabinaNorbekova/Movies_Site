//profile.controller
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ProfilesService } from "./profile.service";
import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { UpdateProfileDto } from "./dto/update-profile.dto";
@ApiTags("Profil")
@Controller("profile")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Get()
  @ApiOperation({ summary: "Profil ma’lumotlarini olish" })
  async getProfile(@Req() req) {
    return this.service.getProfile(req.user.sub);
  }

  @Put()
  @ApiOperation({ summary: "Profilni yangilash" })
  async update(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.service.update(req.user.sub, dto);
  }
}
