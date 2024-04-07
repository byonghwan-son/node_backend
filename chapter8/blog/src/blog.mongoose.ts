import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true}) id: string
  @Prop() title: string
  @Prop() content: string
  @Prop() name: string
  @Prop() description: string
  @Prop() CreatedDt: Date
  @Prop() updatedDt: Date
}

export const BlogSchema = SchemaFactory.createForClass(Blog)
