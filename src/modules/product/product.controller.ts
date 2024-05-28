import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProductDto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreatedProductDto } from './dtos/createdProductDto';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ProductDto } from './dtos/productDto';
import { UpdateProductDto } from './dtos/updateProductDto';

@Role('ADMIN')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('api/product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiCreatedResponse({ type: CreatedProductDto })
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<CreatedProductDto> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('all')
  @ApiOkResponse({ type: ProductDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findAll(): Promise<ProductDto[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findById(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.findById(+id)
  }

  @Get('catalog/:id')
  @ApiOkResponse({ type: ProductDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findAllByCatalogId(@Param('id') id: string): Promise<ProductDto[]> {
    return this.productService.findAllByCatalogId(+id)
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateProductDto })
  async update(@Param('id') id: string, @Body() body: UpdateProductDto): Promise<UpdateProductDto> {
    return this.productService.updateProduct(+id, body)
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  async deleteProduct(@Param('id') id: string): Promise<ProductDto> {
    return this.productService.deleteProduct(+id)
  }
}
