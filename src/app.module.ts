import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BulkActionsModule } from './bulk-actions/bulk-actions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin123',
      database: 'bulk-action-db',
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),
    BulkActionsModule,
    MessagingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
