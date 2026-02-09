import { Controller, Get, Query } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { Post, Body } from '@nestjs/common';
import { BookSeatDto } from './dto/book-seat.dto';

@Controller('api/seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get()
  getSeats(@Query('userId') userId: string) {
    if (userId) {
      return this.seatsService.getSeatsByUser(userId);
    }
    return this.seatsService.getAllSeats();
  }

  @Post()
  async bookSeats(@Body() dto: BookSeatDto) {
    return this.seatsService.bookSeats(dto.userId, dto.seatNumbers);
  }
}
