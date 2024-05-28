import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dtos/CreateStockDto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CreatedStockDto } from './dtos/CreatedStockDto';
import { UpdateStockDto } from './dtos/UpdateStockDto';
import { StockDto } from './dtos/StockDto';

@Role('ADMIN')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('api/stock')
@ApiTags('Stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Post()
  @ApiCreatedResponse({ type: CreatedStockDto })
  create(@Body() createStockDto: CreateStockDto): Promise<CreatedStockDto> {
    return this.stockService.create(createStockDto);
  }

  @Get('all')
  @ApiOkResponse({ type: StockDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findAll(): Promise<StockDto[]> {
    return this.stockService.findAll();
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateStockDto })
  update(@Param('id') productId: string, @Body() body: UpdateStockDto): Promise<UpdateStockDto> {
    return this.stockService.update(+productId, +body.quantity);
  }

  @Delete(':id')
  @ApiOkResponse({ type: StockDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  remove(@Param('id') id: string): Promise<StockDto> {
    return this.stockService.delete(+id);
  }

  @Get(':id')
  @ApiOkResponse({ type: StockDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findById(@Param('id') id: string): Promise<StockDto> {
    return this.stockService.findById(+id);
  }
}
