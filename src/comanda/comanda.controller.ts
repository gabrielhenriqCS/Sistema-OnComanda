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
} from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDTO } from './DTOs/create-comanda.dto';
import { UpdateComandaDTO } from './DTOs/update-comanda.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('comanda')
export class ComandaController {
  constructor(private readonly comandaService: ComandaService) {}

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post()
  create(@Body() data: CreateComandaDTO) {
    return this.comandaService.criarComanda(data);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Get()
  findAll() {
    return this.comandaService.findAll();
  }

  @HttpCode(HttpStatus.FOUND)
  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.comandaService.encontrarComanda(id);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateComandaDTO,
  ) {
    return this.comandaService.atualizarComanda(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.comandaService.deletarComanda(id);
  }
}
