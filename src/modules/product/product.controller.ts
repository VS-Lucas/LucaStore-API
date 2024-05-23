import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProductDto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    const product = await this.productService.createProduct(createProductDto);
    return product;
  }
}
