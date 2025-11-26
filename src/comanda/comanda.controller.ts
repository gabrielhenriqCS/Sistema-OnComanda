import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDTO } from './DTOs/create-comanda.dto';
import { UpdateComandaDTO } from './DTOs/update-comanda.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';

@Roles(Role.ADMIN, Role.GARCOM)
@UseGuards(RolesGuard)
@Controller('comanda')
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() data: CreateComandaDTO) {
    return this.comandaService.criarComanda(data);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.comandaService.findAll();
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.comandaService.encontrarComanda(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateComandaDTO,
  ) {
    return this.comandaService.atualizarComanda(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comandaService.deletarComanda(id);
  }
}
