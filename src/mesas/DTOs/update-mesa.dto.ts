import { PartialType } from "@nestjs/mapped-types";
import { CreateMesaDTO } from "./create-mesa.dto";

export class UpdateMesaDTO extends PartialType(CreateMesaDTO) {}