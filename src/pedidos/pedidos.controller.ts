import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDTO } from './DTOs/create-pedido.dto';
import { Public } from 'src/auth/public.decorator';


@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() data: CreatePedidoDTO) {
    return this.pedidosService.criarPedido(data);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.pedidosService.encontrarPedido();
  }

  @Public()
  @HttpCode(HttpStatus.FOUND)
  @Get('pedidoId=:id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.encontrarPedidoPeloId(+id);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.deletarPedido(+id);
  }
}
