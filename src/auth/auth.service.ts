import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async fazerLogin(
    email: string,
    pass: string,
  ): Promise<{ token_acesso: string }> {
    const usuario = await this.usuarioService.buscarPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const senhaCorreta = await bcrypt.compare(pass, usuario.senha);
    if (!senhaCorreta) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    const payload = { sub: usuario.id, email: usuario.email, funcao: usuario.funcao };
    return { token_acesso: await this.jwtService.signAsync(payload) };
  }
}
