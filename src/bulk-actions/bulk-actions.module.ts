import { Module } from '@nestjs/common';
import { BulkActionsService } from './bulk-actions.service';
import { BulkActionsController } from './bulk-actions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BulkAction } from './entities/bulk-action.entity';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [TypeOrmModule.forFeature([BulkAction]), MessagingModule],
  controllers: [BulkActionsController],
  providers: [BulkActionsService],
})
export class BulkActionsModule { }