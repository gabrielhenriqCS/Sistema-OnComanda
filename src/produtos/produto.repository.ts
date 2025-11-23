import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Produto, Prisma } from '@prisma/client';
import { Public } from 'src/auth/public.decorator';

@Injectable()
export class ProdutoRepository {
  constructor(private prisma: PrismaService) {}

  @Public()
  create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    return this.prisma.produto.create({ data });
  }

  @Public()
  findAll(): Promise<Produto[]> {
    return this.prisma.produto.findMany();
  }

  @Public()
  findOne(id: number): Promise<Produto | null> {
    return this.prisma.produto.findUnique({ where: { id } });
  }

  @Public()
  update(id: number, data: Prisma.ProdutoUpdateInput): Promise<Produto> {
    return this.prisma.produto.update({ where: { id }, data });
  }

  delete(id: number): Promise<Produto> {
    return this.prisma.produto.delete({ where: { id } });
  }
}
