import { PrismaService } from './../../database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dtos/CreateStockDto';
import { CreatedStockDto } from './dtos/CreatedStockDto';
import { UpdateStockDto } from './dtos/UpdateStockDto';
import { StockDto } from './dtos/StockDto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) { }

  async create(createStockDto: CreateStockDto): Promise<CreatedStockDto> {
    const existingProduct = await this.prisma.product.findFirst({
      where: { id: createStockDto.productId }
    })

    if (!existingProduct) {
      throw new NotFoundException();
    }

    const stock = await this.prisma.stock.create({
      data: {
        quantity: createStockDto.quantity,
        product: {
          connect: {
            id: createStockDto.productId
          }
        }
      }
    });

    return {
      quantity: stock.quantity,
      productId: stock.productId
    };
  }

  async update(productId: number, productQuantity: number): Promise<UpdateStockDto> {
    const existingStock = await this.prisma.stock.findUnique({
      where: {
        productId: productId
      }
    });

    if (!existingStock) {
      throw new NotFoundException('No product found in stock');
    }

    const newQuantity = existingStock.quantity + productQuantity;

    const stock = await this.prisma.stock.update({
      where: {
        productId: productId,
      },
      data: {
        quantity: newQuantity,
      },
    });

    return {
      quantity: stock.quantity,
    };
  }

  async delete(stockId: number): Promise<StockDto> {
    const existingStock = await this.prisma.stock.findUnique({
      where: {
        id: stockId
      }
    });

    if (!existingStock) {
      throw new NotFoundException('No stock found');
    }

    const stock = await this.prisma.stock.delete({
      where: {
        id: stockId
      }
    })

    return stock;
    
  }



  async findAll(): Promise<StockDto[]> {
    const stocks = await this.prisma.stock.findMany({
      select: {
        id: true,
        quantity: true,
        productId: true,
      }
    });

    if (stocks.length === 0) {
      throw new NotFoundException('No stock found');
    }

    return stocks;
  }

  async findById(stockId: number): Promise<StockDto> {
    const existingStock = await this.prisma.stock.findUnique({
      where: {
        id: stockId
      }
    });

    if (!existingStock){
      throw new NotFoundException(`No stock found for id ${stockId}`)
    }

    
    return existingStock;
  }

}
