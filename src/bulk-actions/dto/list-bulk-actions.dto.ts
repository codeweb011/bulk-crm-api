import { IsEnum, IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ActionStatus } from '../enums/action-status.enum';

export class ListBulkActionsDto {
    @IsOptional()
    @IsEnum(ActionStatus)
    status?: ActionStatus;

    @IsOptional()
    @IsString()
    entity?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number = 10;
}