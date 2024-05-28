import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderDto } from './dtos/OrderDto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

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

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
