import { IsString, MinLength } from "class-validator";
import { TaskStatus } from "../entities/task.status";

export class CreateTaskDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    content: string;

    status?: TaskStatus;
}
