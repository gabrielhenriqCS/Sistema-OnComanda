import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PedidosRepository } from './pedidos.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDTO } from './DTOs/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    private pedidoRepo: PedidosRepository,
    private prisma: PrismaService,
  ) { }
  
  async criarPedido(data: CreatePedidoDTO) {
    const comanda = await this.prisma.comanda.findUnique({
      where: { id: data.comandaId },
    });
    if (!comanda) {
      throw new NotFoundException('Comanda não encontrada');
    }

    if (comanda.status === 'FECHADA') {
      throw new BadRequestException('Não é possível criar pedido com comanda fechada');
    }

    for (const item of data.itens) {
      const produto = await this.prisma.produto.findUnique({
        where: { id: item.produtoId }
      });

      if (!produto) {
        throw new NotFoundException(`Produto ${produto} não existe`);
      }

      if (!item.precoUnitario) {
        item.precoUnitario = produto.preco;
      }

      if (!item.precoTotal) {
        item.precoTotal = item.precoUnitario * item.quantidade;
      }
    }

    return this.pedidoRepo.create({
      comanda: { connect: { id: data.comandaId } },
      itens: {
        create: data.itens.map((i) => ({
          produto: { connect: { id: i.produtoId } },
          quantidade: i.quantidade,
          observacao: i.observacao,
          precoUnitario: i.precoUnitario,
          precoTotal: i.precoTotal,
        }))
      }
    })
  }

  encontrarPedido() {
    return this.pedidoRepo.findAll();
  }

  encontrarPedidoPeloId(id: number) {
    return this.pedidoRepo.findById(id);
  }

  deletarPedido(id: number) {
    return this.pedidoRepo.delete(id);
  }
}
