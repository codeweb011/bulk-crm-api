import { Module } from '@nestjs/common';
import { BulkActionsService } from './bulk-actions.service';
import { BulkActionsController } from './bulk-actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BulkAction } from './entities/bulk-action.entity';
import { MessagingModule } from 'src/messaging/messaging.module';
import { BulkActionLog } from './entities/bulk-action-logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BulkAction, BulkActionLog]), MessagingModule],
  controllers: [BulkActionsController],
  providers: [BulkActionsService],
})
export class BulkActionsModule { }