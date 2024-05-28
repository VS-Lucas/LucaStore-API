import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dtos/CreateCatalogDto';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiOkResponse, ApiNotFoundResponse, ApiAcceptedResponse } from '@nestjs/swagger';
import { Role } from 'src/decorators/role.decorator';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { CreatedCatalogDto } from './dtos/CreatedCatalogDto';
import { CatalogDto } from './dtos/CatalogDto';
import { UpdateCatalogDto } from './dtos/UpdateCatalogDto';

@Role('ADMIN')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('api/catalog')
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
  @ApiNotFoundResponse({ description: 'Not Found' })
  findAll(): Promise<CatalogDto[]> {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CatalogDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findById(@Param('id') id: string): Promise<UpdateCatalogDto> {
    return this.catalogService.findById(+id);
  }

  @Patch(':id')
  @ApiAcceptedResponse({ type: UpdateCatalogDto })
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto): Promise<UpdateCatalogDto> {
    return this.catalogService.update(+id, updateCatalogDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CatalogDto })
  @ApiNotFoundResponse({ description: 'Not Found' })
  delete(@Param('id') id: string): Promise<CatalogDto> {
    return this.catalogService.delete(+id);
  }
}
