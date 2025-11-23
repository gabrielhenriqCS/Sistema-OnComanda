import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { CreateMesaDTO } from './DTOs/create-mesa.dto';
import { Public } from 'src/auth/public.decorator';
import { UpdateMesaDTO } from './DTOs/update-mesa.dto';

@Controller('mesas')
export class MesasController {
    constructor(private mesaService: MesasService) { }
    
    @HttpCode(HttpStatus.CREATED)
    @Public()
    @Post()
    create(@Body() dto: CreateMesaDTO) {
        return this.mesaService.criarNovaMesa(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Get()
    findAll() {
        return this.mesaService.listarMesas();
    }

    @HttpCode(HttpStatus.FOUND)
    @Public()
    @Get('mesa=:id')
    findById(@Param('id') id: number) {
        return this.mesaService.encontrarMesaPorId(+id);
    }


    @HttpCode(HttpStatus.OK)
    @Public()
    @Patch(':id')
    atualizarMesa(@Param('id') id: number, @Body() dto: UpdateMesaDTO) {
        return this.mesaService.atualizarMesa(+id, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Public()
    @Delete(':id')
    deletarMesa(@Param('id') id: number) {
        return this.mesaService.deletarMesa(+id);
    }
}
