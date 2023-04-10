import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { MaintaskStatus } from "./maintask.status";


@Schema()
export class Maintask extends Document {

    @Prop({
        index: true,
        unique: true,
    })
    title: string;

    @Prop({
        index: true,
        unique: true,
    })
    tasks: string[];

    @Prop({
        index: true,
    })
    content: string;

    @Prop({
        index: true,
    })
    status: MaintaskStatus;
}

export const MaintaskSchema = SchemaFactory.createForClass(Maintask);