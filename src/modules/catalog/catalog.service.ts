import { Injectable } from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CreatedCatalogDto } from './dto/created-catalog.dto';
// import { UpdateCatalogDto } from './dto/update-catalog.dto';

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

  // findAll() {
  //   return `This action returns all catalog`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} catalog`;
  // }

  // update(id: number, updateCatalogDto: UpdateCatalogDto) {
  //   return `This action updates a #${id} catalog`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} catalog`;
  // }
}
