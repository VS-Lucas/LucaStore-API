import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dtos/auth-payload.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dtos/auth.dto';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({ type: AuthDto })
    login(@Body() authPayloadDto: AuthPayloadDto): Promise<AuthDto> {
        return this.authService.login(authPayloadDto);
    }
}
