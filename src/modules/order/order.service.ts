import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dtos/OrderDto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: number): Promise<OrderDto[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (orders.length === 0) {
      throw new NotFoundException('No order found');
    }

    return orders;

  }

  async findAll(): Promise<OrderDto[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (orders.length === 0) {
      throw new NotFoundException('No order found');
    }

    return orders;

  }
}
