import {
  Injectable,
  NotFoundException,
  ConflictException,
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
    const session = await this.reservationModel.db.startSession();
    try {
      await session.withTransaction(async () => {
        const event = await this.eventModel.findById(eventId).session(session);
        if (!event) throw new NotFoundException('Event not found');

        if (event.availableTickets <= 0) {
          throw new ConflictException('No available tickets');
        }

        const existing = await this.reservationModel
          .findOne({
            user: userId,
            event: eventId,
          })
          .session(session);

        if (existing) {
          throw new ConflictException('You already reserved this event');
        }

        await this.reservationModel.create(
          [
            {
              user: userId,
              event: eventId,
            },
          ],
          { session },
        );

        event.availableTickets -= 1;
        await event.save({ session });
      });
      session.endSession();

      return await this.reservationModel.findOne({
        user: userId,
        event: eventId,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async cancel(eventId: string, userId: string): Promise<void> {
    const reservation = await this.reservationModel.findOne({
      user: userId,
      event: eventId,
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    await reservation.deleteOne();

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
