import { Body, Controller, HttpException, HttpStatus, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() authPayloadDto: AuthPayloadDto) {
        return this.authService.login(authPayloadDto);
    }
}
