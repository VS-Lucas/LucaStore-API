import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dtos/createProductDto';
import { CreatedProductDto } from './dtos/createdProductDto';
import { ProductDto } from './dtos/productDto';
import { UpdateProductDto } from './dtos/updateProductDto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async createProduct(createProductDto: CreateProductDto): Promise<CreatedProductDto> {
    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        catalog: {
          connect: {
            id: createProductDto.catalogId
          }
        }
      },
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      catalog: {
        id: product.catalogId
      }
    };
  }

  async findAll(): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        catalogId: true
      }
    });

    if (products.length === 0) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  async findById(productId: number): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!product) {
      throw new NotFoundException();
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      catalogId: product.catalogId
    }
  }

  async findAllByCatalogId(catalogId: number): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany({
      where: {
        catalogId: catalogId
      }
    })

    if (products.length === 0) {
      throw new NotFoundException('No products found');
    }

    return products;
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto): Promise<UpdateProductDto> {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });
  
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  
    const product = await this.prisma.product.update({
      where: { id: productId },
      data: {
        ...(updateProductDto.name && { name: updateProductDto.name }),
        ...(updateProductDto.description && { description: updateProductDto.description }),
        ...(updateProductDto.price && { price: updateProductDto.price }),
        ...(updateProductDto.catalogId && { 
          catalog: {
            connect: { id: updateProductDto.catalogId },
          }
        }),
      },
    });
  
    return product;
  }

  async deleteProduct(productId: number): Promise<ProductDto> {
    const product = await this.prisma.product.delete({
      where: {
        id: productId
      }
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      catalogId: product.catalogId
    };
  }

}
