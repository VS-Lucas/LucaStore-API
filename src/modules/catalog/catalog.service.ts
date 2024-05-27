import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogDto } from './dtos/CreateCatalogDto';
import { PrismaService } from 'src/database/prisma.service';
import { CreatedCatalogDto } from './dtos/CreatedCatalogDto';
import { CatalogDto } from './dtos/CatalogDto';
import { UpdateCatalogDto } from './dtos/UpdateCatalogDto';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) { }

  async create(createCatalogDto: CreateCatalogDto): Promise<CreatedCatalogDto> {
    const catalog = await this.prisma.catalog.create({
      data: createCatalogDto
    })

    return {
      id: catalog.id,
      name: catalog.name,
      category: catalog.category
    };
  }

  async findAll(): Promise<CatalogDto[]> {
    const catalogs = await this.prisma.catalog.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        products: true
      }
    });

    if (catalogs.length === 0) {
      throw new NotFoundException('No catalog found');
    }

    return catalogs
  }

  async findById(catalogId: number): Promise<CatalogDto> {
    const existingCatalog = await this.prisma.catalog.findUnique({
      where: {
        id: catalogId,
      },
      include: {
        products: true
      },
    });

    if (!existingCatalog) {
      throw new NotFoundException(`No catalog found for id ${catalogId}`);
    }

    return existingCatalog;
  }


  async update(catalogId: number, updateCatalogDto: UpdateCatalogDto): Promise<UpdateCatalogDto> {
    const existingCatalog = await this.prisma.catalog.findUnique({
      where: {
        id: catalogId
      }
    });

    if (!existingCatalog) {
      throw new NotFoundException(`No catalog found for id ${catalogId}`)
    }

    const catalog = await this.prisma.catalog.update({
      where: {
        id: catalogId,
      },
      data: {
        name: updateCatalogDto.name,
        category: updateCatalogDto.category
      },
    });

    return {
      name: catalog.name,
      category: catalog.category
    };
  }

  async delete(catalogId: number): Promise<CatalogDto> {
    const existingCatalog = await this.prisma.catalog.findUnique({
      where: {
        id: catalogId,
      },
      include: {
        products: true,
      },
    });
  
    if (!existingCatalog) {
      throw new NotFoundException('No catalog found');
    }
  
    await this.prisma.catalog.delete({
      where: {
        id: catalogId,
      },
    });
  
    return existingCatalog;
  }
  
}
