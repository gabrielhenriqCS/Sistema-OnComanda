import { IsInt, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CreateItemPedidoDTO {
  @IsInt()
  produtoId: number;

  @IsInt()
  @Min(1)
  quantidade: number;

  @IsNumber()
  precoUnitario: number;

  @IsNumber()
  precoTotal: number;

  @IsOptional()
  @IsString()
  observacao?: string;
}
