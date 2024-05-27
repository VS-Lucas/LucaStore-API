import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dtos/CreateCartDto';
import { PrismaService } from 'src/database/prisma.service';
import { CreatedCartDto } from './dtos/CreatedCartDto';
import { CartDto } from './dtos/CartDto';
import { UpdateCartDto } from './dtos/UpdateCartDto';
import { OrderDto } from './dtos/OrderDto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  async create(createCartDto: CreateCartDto, userId: number): Promise<CreatedCartDto> {

    const existingCart = await this.prisma.cart.findFirst({
      where: {
        userId: userId
      }
    })

    if (existingCart) {
      throw new ConflictException('A cart already exists for this user');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found for id ${userId}`);
    }

    const productIds = createCartDto.items.map(item => item.productId);

    const uniqueProductIds = [...new Set(productIds)]

    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: uniqueProductIds,
        },
      },
    });

    if (products.length !== createCartDto.items.length) {
      throw new NotFoundException('One or more products not found');
    }

    const cart = await this.prisma.cart.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        items: {
          create: createCartDto.items.map(item => ({
            quantity: item.quantity,
            product: {
              connect: {
                id: item.productId,
              },
            },
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return cart;
  }

  async inscreaseQuantity(userId: number, updateCartDto: UpdateCartDto): Promise<CartDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found for id ${userId}`);
    }

    const product = await this.prisma.product.findUnique({
      where: {
        id: updateCartDto.productId
      }
    })

    if (!product) {
      throw new NotFoundException(`No product found for id ${updateCartDto.productId}`);
    }

    const cart = await this.prisma.cart.findFirst({
      where: {
        userId: userId
      },
      include: {
        items: true
      }
    })

    if (!cart) {
      throw new NotFoundException(`No cart found`);
    }

    const cartItem = cart.items.find(item => item.productId === updateCartDto.productId);

    if (!cartItem) {
      throw new NotFoundException(`Product with id ${updateCartDto.productId} not found in the cart`);
    }

    const newQuantity = cartItem.quantity + updateCartDto.quantity;

    await this.prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: newQuantity },
    });

    const updatedCart = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true },
    });

    return updatedCart;
  }

  async deleteByUserId(userId: number): Promise<CartDto> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId: userId
      },
      include: {
        items: true
      }
    })

    if (!cart) {
      throw new NotFoundException(`No cart found`);
    }

    if (cart.items.length > 0) {
      await this.prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id
        }
      })
    }

    const deletedCart = await this.prisma.cart.delete({
      where: {
        id: cart.id
      },
      include: {
        items: true
      }
    })

    return deletedCart;
  }

  async findAll(): Promise<CartDto[]> {
    const carts = await this.prisma.cart.findMany({
      select: {
        id: true,
        userId: true,
        items: true
      }
    });

    if (carts.length === 0) {
      throw new NotFoundException('No products found')
    }

    return carts;
  }

  async findByUserId(userId: number): Promise<CartDto> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId: userId
      },
      include: {
        items: true
      }
    });

    if (!cart) {
      throw new NotFoundException('No cart found')
    }

    return cart;
  }

  async finishOrder(cartId: number): Promise<OrderDto> {
    const existingCart = await this.prisma.cart.findFirst({
      where: {
        id: cartId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!existingCart) {
      throw new ConflictException(`No cart found for id ${cartId}`);
    }

    const total = existingCart.items.reduce((acc, item) => {
      return acc + (item.quantity * item.product.price);
    }, 0);


    const order = await this.prisma.order.create({
      data: {
        user: {
          connect: {
            id: existingCart.userId,
          },
        },
        items: {
          create: existingCart.items.map(item => ({
            quantity: item.quantity,
            product: {
              connect: {
                id: item.productId,
              },
            },
          })),
        },
        total: total
      },
      include: {
        items: true,
      },
    });

    this.deleteByUserId(existingCart.userId);

    return order;

  }

}
