import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Event, EventDocument } from 'src/events/schemas/event.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async reserve(eventId: string, userId: string): Promise<Reservation> {
    const event = await this.eventModel.findById(eventId);
    if (!event) throw new NotFoundException('Event not found');

    if (event.availableTickets <= 0) {
      throw new ConflictException('No available tickets');
    }

    const existing = await this.reservationModel.findOne({
      user: userId,
      event: eventId,
    });

    if (existing) {
      throw new ConflictException('You already reserved this event');
    }

    //For reserving
    const reservation = await this.reservationModel.create({
      user: userId,
      event: eventId,
    });

    // Reduce available tickets
    event.availableTickets -= 1;
    await event.save();

    return reservation;
  }

  async cancel(eventId: string, userId: string): Promise<void> {
    const reservation = await this.reservationModel.findOne({
      user: userId,
      event: eventId,
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    //Deleting reservation
    await reservation.deleteOne();

    //Increase tickets
    await this.eventModel.findByIdAndUpdate(eventId, {
      $inc: { availableTickets: 1 },
    });
  }

  async findMyReservation(userId: string): Promise<Reservation[]> {
    return this.reservationModel
      .find({ user: userId })
      .populate('event')
      .sort({ createdAt: -1 })
      .exec();
  }
}
