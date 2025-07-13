import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dt';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(CreateEventDto: CreateEventDto, userId: string): Promise<Event> {
    return this.eventModel.create({
      ...CreateEventDto,
      date: new Date(CreateEventDto.date),
      availableTickets: CreateEventDto.capacity,
      organizer: userId,
    });
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().sort({ date: 1 }).exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(
    id: string,
    dto: UpdateEventDto,
    userId: string,
  ): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Event not found');
    if (event.organizer !== userId)
      throw new ForbiddenException('Unauthorized');

    Object.assign(event, dto);
    return event.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    const event = await this.eventModel.findById(id);
    if (!event) throw new NotFoundException('Event not found');
    if (event.organizer !== userId)
      throw new ForbiddenException('Unauthorized');
    await event.deleteOne();
  }
}
