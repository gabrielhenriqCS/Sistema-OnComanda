import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProdutoDTO {
  @IsString()
  nome: string;

  @IsNumber()
  @Min(0)
  preco: number;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  categoria: string;
}
