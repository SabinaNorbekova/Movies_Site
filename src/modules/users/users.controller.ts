//users.controller
import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserRoles } from "src/decorators/role.decorator";
import { Roles } from "src/decorators/role.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { UsersService } from "./users.service";

@ApiTags('Manage Users')
@Controller('users')
export class UserController{
    constructor(private readonly usersService: UsersService) { }
    
    @Patch(':id/role')
    @ApiBearerAuth()
    @UserRoles(Roles.SUPERADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    @ApiOperation({ summary: "Edit user's role" })
    async changeRole(@Param('id') id: string, @Body() body: { role: any }) {
        return this.usersService.updateRole(id, body.role)
    }

}