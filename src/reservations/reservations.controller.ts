import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post(':eventId')
  reserve(@Param('eventId') eventId: string, @Request() req) {
    return this.reservationsService.reserve(eventId, req.user.userId);
  }

  @Delete(':eventId')
  cancel(@Param('eventId') eventId: string, @Request() req) {
    return this.reservationsService.cancel(eventId, req.user.userId);
  }

  @Get('me')
  getMyReservations(@Request() req) {
    return this.reservationsService.findMyReservation(req.user.userId);
  }
}
