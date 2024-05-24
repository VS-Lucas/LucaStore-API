import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUserDto';
import { UpdateUserDto } from './dtos/updateUserDto';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/userDto';
import { DeletedUserDto } from './dtos/deletedUserDto';
import { CreatedUserDto } from './dtos/createdUserDto';
import { UpdatedUserDto } from './dtos/updatedUserDto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Role } from 'src/decorators/role.decorator';

@Role('ADMIN')
@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: CreatedUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto, isArray: true })
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  async getById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getById(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdatedUserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdatedUserDto> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiAcceptedResponse({ type: DeletedUserDto })
  async delete(@Param('id') id: string): Promise<DeletedUserDto> {
    return this.userService.delete(+id);
  }
}
