import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CreatedCatalogDto } from './dto/created-catalog.dto';
// import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Role('ADMIN')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('catalog')
@ApiTags('Catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedCatalogDto })
  async create(@Body() createCatalogDto: CreateCatalogDto): Promise<CreatedCatalogDto> {
    return this.catalogService.create(createCatalogDto);
  }

  // @Get()
  // findAll() {
  //   return this.catalogService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.catalogService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
  //   return this.catalogService.update(+id, updateCatalogDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.catalogService.remove(+id);
  // }
}
