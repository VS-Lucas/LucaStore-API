import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth-payload.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login({ email, password }: AuthPayloadDto): Promise<AuthDto> {
        const user = await this.prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { email: user.email, password: user.password, role: user.role};

        return {
            accessToken: await this.jwtService.signAsync(payload),
        }

    }

}
