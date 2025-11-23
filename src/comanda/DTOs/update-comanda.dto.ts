import { IsEnum, IsOptional } from 'class-validator';
import { StatusComanda } from '@prisma/client';

export class UpdateComandaDTO {
    @IsOptional()
    @IsEnum(StatusComanda)
    status?: StatusComanda;
}
