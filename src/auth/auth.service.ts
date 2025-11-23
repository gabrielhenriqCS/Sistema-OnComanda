import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

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
    const usuario = await this.usuarioService.encontrarUsuarioPorEmail(email);
    if (usuario?.senha !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: usuario.id, email: usuario.email };
    return { token_acesso: await this.jwtService.signAsync(payload) };
  }
}
