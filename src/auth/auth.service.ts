import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login({ email, password }: AuthPayloadDto): Promise<AuthEntity> {
        try {
            const user = await this.prisma.user.findUnique({ where: { email: email } });

            if (!user) {
                throw new NotFoundException(`No user found for email: ${email}`);
            }

            const isPasswordValid = user.password === password;

            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid password');
            }

            return {
                accessToken: this.jwtService.sign({ userId: user.id }),
            };
        } catch (error) {
            throw error;
        }
    }

}
