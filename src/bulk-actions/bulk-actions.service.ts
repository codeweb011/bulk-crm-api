import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkAction } from './entities/bulk-action.entity';
import { CreateBulkActionDto } from './dto/create-bulk-action.dto';
import { ActionStatus } from './enums/action-status.enum';
import { ListBulkActionsDto } from './dto/list-bulk-actions.dto';
import { EVENT_PUBLISHER } from 'src/messaging/messaging.constants';
import * as messagingInterface from 'src/messaging/messaging.interface';

@Injectable()
export class BulkActionsService {
    constructor(
        @InjectRepository(BulkAction)
        private readonly bulkRepository: Repository<BulkAction>,

        @Inject(EVENT_PUBLISHER)
        private readonly eventPublisher: messagingInterface.EventPublisher
    ) { }

    async createBulkAction(dto: CreateBulkActionDto) {
        // In real system, you'd estimate total records here
        const estimatedCount = 0; // placeholder

        const bulkAction = this.bulkRepository.create({
            ...dto,
            status: ActionStatus.QUEUED,
            totalRecords: estimatedCount,
            processedRecords: 0,
            failedRecords: 0,
        });

        const saved = await this.bulkRepository.save(bulkAction);

        // Emit event to orchestrator
        await this.eventPublisher.publish(
            'bulk.action.created',
            {
                bulkActionId: saved.id,
            },
        );

        return {
            id: saved.id,
            status: saved.status,
            createdAt: saved.createdAt,
        };
    }

    async getBulkActionById(id: string) {
        const bulkAction = await this.bulkRepository.findOne({
            where: { id },
        });

        if (!bulkAction) {
            throw new NotFoundException(`Bulk action with id ${id} not found`);
        }

        return {
            id: bulkAction.id,
            entity: bulkAction.entity,
            actionType: bulkAction.actionType,
            filters: bulkAction.filters,
            payload: bulkAction.payload,
            status: bulkAction.status,
            totalRecords: bulkAction.totalRecords,
            totalBatches: bulkAction.totalBatches,
            processedRecords: bulkAction.processedRecords,
            failedRecords: bulkAction.failedRecords,
            startedAt: bulkAction.startedAt,
            completedAt: bulkAction.completedAt,
            totalDurationMs: bulkAction.totalDurationMs,
            createdAt: bulkAction.createdAt,
            updatedAt: bulkAction.updatedAt,
        };
    }

    async listBulkActions(query: ListBulkActionsDto) {
        const { page, limit, status, entity } = query;

        const skip = (page - 1) * limit;

        const qb = this.bulkRepository.createQueryBuilder('bulk');

        if (status) {
            qb.andWhere('bulk.status = :status', { status });
        }

        if (entity) {
            qb.andWhere('bulk.entity = :entity', { entity });
        }

        qb.orderBy('bulk.createdAt', 'DESC');

        qb.skip(skip).take(limit);

        const [data, total] = await qb.getManyAndCount();

        return {
            data: data.map((item) => ({
                id: item.id,
                entity: item.entity,
                actionType: item.actionType,
                status: item.status,
                totalRecords: item.totalRecords,
                processedRecords: item.processedRecords,
                failedRecords: item.failedRecords,
                createdAt: item.createdAt,
                startedAt: item.startedAt,
                completedAt: item.completedAt,
                totalDurationMs: item.totalDurationMs,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}