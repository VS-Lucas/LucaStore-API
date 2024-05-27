import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
