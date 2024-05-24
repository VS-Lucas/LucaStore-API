import { CreateUserDto } from './dtos/createUserDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDto } from './dtos/updateUserDto';
import { CreatedUserDto } from './dtos/createdUserDto';
import { UserDto } from './dtos/userDto';
import { DeletedUserDto } from './dtos/deletedUserDto';
import { UpdatedUserDto } from './dtos/updatedUserDto';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHashing);
    createUserDto.password = hashedPassword;

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      name: user.name,
      email: user.email,
      role: user.role
    };
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      },
    });

    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async getById(userId: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found for id: ${userId}`);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdatedUserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, roundsOfHashing);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      id: user.id,
      name: user.name
    };
  }

  async delete(id: number): Promise<DeletedUserDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  // async resetUserIdSequence(): Promise<void> {
  //   await this.prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'User';`;
  // }
}
