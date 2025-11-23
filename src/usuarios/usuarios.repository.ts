import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    const hashSenha = await bcrypt.hash(data.senha, 10);
    return this.prisma.usuario.create({ data: { ...data, senha: hashSenha} });
  }

  findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  update(email: string, data: Prisma.UsuarioUpdateInput): Promise<Usuario> {
    return this.prisma.usuario.update({ where: { email }, data });
  }

  remove(email: string): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { email } });
  }
}
