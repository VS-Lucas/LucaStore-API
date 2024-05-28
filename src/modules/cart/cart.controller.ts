import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dtos/CreateCartDto';
import { CreatedCartDto } from './dtos/CreatedCartDto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Role } from 'src/decorators/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CartDto } from './dtos/CartDto';
import { UpdateCartDto } from './dtos/UpdateCartDto';
import { OrderDto } from '../order/dtos/OrderDto';

@UseGuards(AuthenticationGuard)
@Controller('api/cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get('all')
  @ApiOkResponse({ type: CartDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Role('ADMIN')
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  findAll(): Promise<CartDto[]> {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CartDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Role('ADMIN')
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string): Promise<CartDto> {
    return this.cartService.findByUserId(+id);
  }

  @Post('user/:id')
  @ApiCreatedResponse({ type: CreatedCartDto })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    example: '1',
  })
  @ApiBearerAuth()
  create(@Body() createCartDto: CreateCartDto, @Param('id') id: string): Promise<CreatedCartDto> {
    return this.cartService.create(createCartDto, +id);
  }

  @Post('order/:id')
  @ApiAcceptedResponse({ type: OrderDto })
  @ApiParam({
    name: 'id',
    description: 'The ID of the cart',
    example: '1',
  })
  @ApiBearerAuth()
  finishOrder(@Param('id') id: string): Promise<OrderDto> {
    return this.cartService.finishOrder(+id);
  }

  @Patch('user/:id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    example: '1',
  })
  @ApiBearerAuth()
  @ApiAcceptedResponse({ type: CartDto })
  update(@Param('id') userId: string, @Body() updateCartDto: UpdateCartDto): Promise<CartDto> {
    return this.cartService.inscreaseQuantity(+userId, updateCartDto);
  }

  @Delete('user/:id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    example: '1',
  })
  @Role('ADMIN')
  @UseGuards(AuthorizationGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CartDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async deleteByUserId(@Param('id') userId: string): Promise<CartDto> {
    return this.cartService.deleteByUserId(+userId);
  }
}
