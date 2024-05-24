import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProductDto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatedProductDto } from './dtos/createdProductDto';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ProductDto } from './dtos/productDto';

@Role('ADMIN')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiCreatedResponse({ type: CreatedProductDto })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<CreatedProductDto> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('all')
  @ApiOkResponse({ type: ProductDto, isArray: true })
  async findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  async findById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.findById(+id)
  }

  @Get('catalog/:id')
  @ApiOkResponse({ type: ProductDto, isArray: true })
  async findAllByCatalogId(@Param('id') id: string): Promise<ProductDto[]> {
    return this.productService.findAllByCatalogId(+id)
  }

  @Delete(':id')
  @ApiAcceptedResponse({ type: ProductDto })
  async deleteProduct(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.deleteProduct(+id)
  }
}
