import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { OrderDto } from './dtos/OrderDto';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Role } from 'src/decorators/role.decorator';

@UseGuards(AuthenticationGuard)
@Controller('api/order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('all/:id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    example: '1',
  })
  @ApiOkResponse({ type: OrderDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBearerAuth()
  findAllByUserId(@Param('id') id: string): Promise<OrderDto[]> {
    return this.orderService.findAllByUserId(+id);
  }

  @Get('all')
  @Role('ADMIN')
  @UseGuards(AuthorizationGuard)
  @ApiOkResponse({ type: OrderDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBearerAuth()
  findAll(): Promise<OrderDto[]> {
    return this.orderService.findAll();
  }
}
