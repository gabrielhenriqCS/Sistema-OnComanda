import { Injectable } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { CreateUsuarioDTO } from './DTOs/create-usuario.dto';
import { UpdateUsuarioDTO } from './DTOs/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly usuariosRepo: UsuariosRepository) {}

  async create(data: CreateUsuarioDTO) {
    return this.usuariosRepo.create(data);
  }

  async listarUsuarios() {
    return this.usuariosRepo.findAll();
  }

  async encontrarUsuarioPorId(id: number) {
    return this.usuariosRepo.findOne(id);
  }

  async encontrarUsuarioPorEmail(email: string) {
    return this.usuariosRepo.findByEmail(email);
  }

  async atualizarUsuario(email: string, data: UpdateUsuarioDTO) {
    await this.encontrarUsuarioPorEmail(email);
    return this.usuariosRepo.update(email, data);
  }

  async deletarUsuario(email: string) {
    await this.encontrarUsuarioPorEmail(email);
    return this.usuariosRepo.remove(email);
  }
}
