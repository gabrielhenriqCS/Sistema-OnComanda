import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUsuarioDTO } from './../usuarios/DTOs/create-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  fazerLogin(@Body() loginDto: CreateUsuarioDTO) {
    return this.authService.fazerLogin(loginDto.email, loginDto.senha);
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  getPerfil(@Request() req: any) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  sairPerfil(@Request() req: any) {
    return req.user;
  }
}
