import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Content extends Document {
  @Prop()
  data: string;

  @Prop()
  type: string;

  @Prop()
  parentId: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);