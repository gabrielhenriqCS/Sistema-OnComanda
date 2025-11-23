import { StatusMesa } from "@prisma/client";
import { IsEnum, IsNumber } from "class-validator";

export class CreateMesaDTO {
    @IsNumber()
    numero: number;

    @IsEnum(StatusMesa)
    status: StatusMesa;
}