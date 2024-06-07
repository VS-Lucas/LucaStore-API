import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPasswordUser1 = await bcrypt.hash('securepassword1', 10);
  const hashedPasswordUser2 = await bcrypt.hash('securepassword2', 10);

  // Seed for Catalog
  const catalog1 = await prisma.catalog.create({
    data: {
      name: 'Electronics',
      category: 'Gadgets',
      products: {
        create: [
          {
            name: 'Smartphone',
            description: 'Latest model smartphone',
            price: 699.99,
          },
          {
            name: 'Laptop',
            description: 'High performance laptop',
            price: 1299.99,
          },
        ],
      },
    },
  });

  const catalog2 = await prisma.catalog.create({
    data: {
      name: 'Books',
      category: 'Literature',
      products: {
        create: [
          {
            name: 'Novel',
            description: 'A fascinating novel',
            price: 19.99,
          },
          {
            name: 'Science Book',
            description: 'An informative science book',
            price: 29.99,
          },
        ],
      },
    },
  });

  // Seed for User
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      password: hashedPasswordUser1,
      role: 'CLIENT',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPasswordUser2,
      role: 'ADMIN',
    },
  });

  console.log({ catalog1, catalog2, user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
