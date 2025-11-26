import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDTO } from './DTOs/create-mesa.dto';
import { UpdateMesaDTO } from './DTOs/update-mesa.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('mesas')
export class MesasController {
  constructor(private mesaService: MesasService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateMesaDTO) {
    return this.mesaService.criarNovaMesa(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get()
  findAll() {
    return this.mesaService.listarMesas();
  }

  @HttpCode(HttpStatus.FOUND)
  @Public()
  @Get('mesa=:id')
  findById(@Param('id') id: number) {
    return this.mesaService.encontrarMesaPorId(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  atualizarMesa(@Param('id') id: number, @Body() dto: UpdateMesaDTO) {
    return this.mesaService.atualizarMesa(+id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletarMesa(@Param('id') id: number) {
    return this.mesaService.deletarMesa(+id);
  }
}
