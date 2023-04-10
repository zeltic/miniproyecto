import { IsMongoId, IsOptional, IsString, MinLength } from "class-validator";
import { MaintaskStatus } from "../entities/maintask.status";


export class CreateMaintaskDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsMongoId()
    @IsOptional()
    tasks?: string[];

    @IsString()
    @MinLength(1)
    content: string;

    status?: MaintaskStatus;
}
