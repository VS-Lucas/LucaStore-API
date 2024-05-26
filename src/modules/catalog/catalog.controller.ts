import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dtos/CreateCatalogDto';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CreatedCatalogDto } from './dtos/CreatedCatalogDto';
import { CatalogDto } from './dtos/CatalogDto';
import { UpdateCatalogDto } from './dtos/UpdateCatalogDto';
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

  @Get('all')
  @ApiOkResponse({ type: CatalogDto, isArray: true })
  findAll(): Promise<CatalogDto[]> {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CatalogDto })
  findById(@Param('id') id: string): Promise<UpdateCatalogDto> {
    return this.catalogService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.catalogService.delete(+id);
  }
}
