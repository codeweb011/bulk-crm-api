import {
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsString,
} from 'class-validator';
import { ActionType } from '../enums/action-type.enum';

export class CreateBulkActionDto {
    @IsString()
    entity: string;

    @IsEnum(ActionType)
    actionType: ActionType;

    @IsObject()
    @IsNotEmpty()
    filters: Record<string, any>;

    @IsObject()
    @IsNotEmpty()
    payload: Record<string, any>;
}