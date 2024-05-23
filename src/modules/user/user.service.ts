import { CreateUserDto } from './dtos/createUserDto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDto } from './dtos/updateUserDto';
import { CreatedUserDto } from './dtos/createdUserDto';
import { UserDto } from './dtos/userDto';
import { DeletedUserDto } from './dtos/deletedUserDto';
import { UpdatedUserDto } from './dtos/updatedUserDto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    exclude<User, Key extends keyof User>(
        user: User,
        keys: Key[]
    ): Omit<User, Key> {
        return Object.fromEntries(
            Object.entries(user).filter(([key]) => !keys.includes(key as Key))
        ) as Omit<User, Key>;
    }

    async create(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                name: createUserDto.name,
                password: createUserDto.password
            }
        });

        const filteredUser = this.exclude(user, ['password', 'id']);

        return filteredUser;
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        return users;
    }

    async getById(userId: number): Promise<UserDto> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const filteredUser = this.exclude(user, ['password']);

        return filteredUser;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdatedUserDto> {
        const user = await this.prisma.user.update({
            where: { id },
            data: updateUserDto
        })

        const filteredUser = this.exclude(user, ['id', 'email']);

        return filteredUser;
    }

    async delete(id: number): Promise<DeletedUserDto> {
        return this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}
