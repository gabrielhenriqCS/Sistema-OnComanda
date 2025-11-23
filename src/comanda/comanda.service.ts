import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateComandaDTO } from './DTOs/create-comanda.dto';
import { ComandaRepository } from './comanda.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusComanda, StatusMesa } from '@prisma/client';
import { connect } from 'http2';

@Injectable()
export class ComandaService {
  constructor(
    private readonly comandaRepo: ComandaRepository,
    private readonly prisma: PrismaService,
  ) {}

  async criarComanda(data: CreateComandaDTO) {
    const mesa = await this.prisma.mesa.findUnique({
      where: { id: data.mesaId },
    });

    if (!mesa) {
      throw new NotFoundException('Mesa não encontrada.');
    }

    if (mesa.status === StatusMesa.OCUPADA) {
      throw new BadRequestException('Mesa está ocupada.');
    }

    const comanda = await this.comandaRepo.create({
      cliente: data.cliente,
      mesa: { connect: { id: data.mesaId } },
    });

    await this.prisma.mesa.update({
      where: { id: data.mesaId },
      data: { status: StatusMesa.OCUPADA },
    });

    return comanda;
  }

  findAll() {
    return this.comandaRepo.findAll();
  }

  async encontrarComanda(id: number) {
    const comanda = await this.comandaRepo.findById(id);
    if (!comanda) {
      throw new NotFoundException('Comanda não encontrada.');
    }
    return comanda;
  }

  async atualizarComanda(id: number, data: { status?: StatusComanda }) {
    await this.encontrarComanda(id);
    return this.comandaRepo.update(id, data);
  }

  async deletarComanda(id: number) {
    await this.encontrarComanda(id);

    await this.prisma.mesa.update({
      where: { id },
      data: { status: StatusMesa.LIVRE },
    });

    return this.comandaRepo.delete(id);
  }
}
