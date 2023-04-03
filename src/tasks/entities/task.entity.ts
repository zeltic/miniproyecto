import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { TaskStatus } from "./task.status";

@Schema()
export class Task extends Document {

    @Prop({
        index: true,
        unique: true,
    })
    title: string;
    
    @Prop({
        index: true,
    })
    content: string;

    @Prop({
        index: true,
    })
    status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);