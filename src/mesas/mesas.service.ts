import { Injectable, NotFoundException } from '@nestjs/common';
import { MesasRepository } from './mesas.repository';
import { CreateMesaDTO } from './DTOs/create-mesa.dto';
import { UpdateMesaDTO } from './DTOs/update-mesa.dto';

@Injectable()
export class MesasService {
  constructor(private readonly mesasRepo: MesasRepository) {}

  criarNovaMesa(dto: CreateMesaDTO) {
    return this.mesasRepo.create(dto);
  }

  listarMesas() {
    return this.mesasRepo.findAll();
  }

  encontrarMesaPorId(id: number) {
    const mesa = this.mesasRepo.findById(id);

    if (!mesa) {
      throw new NotFoundException('Mesa não encontrada.');
    }

    return mesa;
  }

  atualizarMesa(id: number, dto: UpdateMesaDTO) {
    return this.mesasRepo.update({ where: { id }, data: dto });
  }

  deletarMesa(id: number) {
    return this.mesasRepo.delete(id);
  }
}
