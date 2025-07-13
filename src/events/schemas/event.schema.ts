import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, min: 1 })
  capacity: number;

  @Prop({ required: true })
  availableTickets: number;

  @Prop({ required: true })
  organizer: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
