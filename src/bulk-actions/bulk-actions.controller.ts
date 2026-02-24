import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { BulkActionsService } from './bulk-actions.service';
import { CreateBulkActionDto } from './dto/create-bulk-action.dto';
import { ListBulkActionsDto } from './dto/list-bulk-actions.dto';

@Controller('bulk-actions')
export class BulkActionsController {
    constructor(private readonly bulkService: BulkActionsService) { }

    @Post()
    async create(@Body() dto: CreateBulkActionDto) {
        return this.bulkService.createBulkAction(dto);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.bulkService.getBulkActionById(id);
    }

    @Get()
    async list(@Query() query: ListBulkActionsDto) {
        return this.bulkService.listBulkActions(query);
    }

    @Get(':id/logs')
    async getLogs(
        @Param('id') id: string,
        @Query('status') status?: string,
        @Query('page') page = '1',
        @Query('limit') limit = '50',
    ) {
        return this.bulkService.getBulkActionLogs(
            id,
            status,
            Number(page),
            Number(limit),
        );
    }
}