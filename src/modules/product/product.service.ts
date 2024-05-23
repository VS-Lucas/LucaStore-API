import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dtos/createProductDto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        category: createProductDto.category,
      },
    });

    return product;
  }
}
