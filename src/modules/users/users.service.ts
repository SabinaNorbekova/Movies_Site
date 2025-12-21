//users.service
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService{
    constructor(private prisma: PrismaService) { }
    
    async updateRole(userId: string, newRole: "user" | "admin" | "superadmin") {
        const user = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!user) throw new NotFoundException('Foydalanuvchi topilmadi')
        
        return this.prisma.user.update({
            where: { id: userId },
            data:{role:newRole as any}
        })
    }

    async findAll() {
        return this.prisma.user.findMany({
            select:{id:true,username:true,email:true,role:true,createdAt:true}
        })
    }
}