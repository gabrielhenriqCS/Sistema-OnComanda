import { Role } from '@prisma/client';

export class UpdateUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  funcao: Role;
}
