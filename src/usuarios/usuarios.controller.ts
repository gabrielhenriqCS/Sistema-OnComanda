import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDTO } from './DTOs/create-usuario.dto';
import { UpdateUsuarioDTO } from './DTOs/update-usuario.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  async listarUsuarios() {
    return this.usuariosService.listarUsuarios();
  }

  @Public()
  @HttpCode(HttpStatus.FOUND)
  @Get('id=:id')
  async encontrarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.encontrarUsuarioPorId(id);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() usuarioDto: CreateUsuarioDTO) {
    return this.usuariosService.create(usuarioDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('email=:email')
  async encontrarPorEmail(@Param('email') email: string) {
    return this.usuariosService.encontrarUsuarioPorEmail(email);
  }

  @Public()
  @HttpCode(HttpStatus.GONE)
  @Put(':email')
  update(@Param('email') email: string, @Body() data: UpdateUsuarioDTO) {
    return this.usuariosService.atualizarUsuario(email, data);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':email')
  delete(@Param('email') email: string) {
    return this.usuariosService.deletarUsuario(email);
  }
}
