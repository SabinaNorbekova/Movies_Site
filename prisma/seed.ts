import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { PrismaService } from 'src/prisma/prisma.service';

const prisma = new PrismaService;

async function main() {
  console.log('Start testing...');

  const password = await bcrypt.hash('12345', 10);

  const superadmin = await prisma.user.upsert({
    where: { email: 'sabinanorbekova1211@gmail.com' },
    update: {},
    create: {
      username: 'SuperAdmin',
      email: 'sabinanorbekova1211@gmail.com',
      passwordHash: password,
      avatarUrl: 'https://picsum.photos/200',
      role: 'superadmin',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'norbekovasabina2106@gmail.com' },
    update: {},
    create: {
      username: 'Admin',
      email: 'norbekovasabina2106@gmail.com',
      passwordHash: password,
      avatarUrl: 'https://picsum.photos/200',
      role: 'admin',
    },
  });
  console.log(`Created SuperAdmin (${superadmin.id}) and admin (${admin.id})`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
