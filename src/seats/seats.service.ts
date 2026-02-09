import { Injectable } from '@nestjs/common';
import { Seat } from './seat.model';
import { Mutex } from 'async-mutex';

@Injectable()
export class SeatsService {
  private seats = new Map<string, Seat>();
  private mutex = new Mutex();

  constructor() {
    this.initializeSeats();
  }

  private initializeSeats() {
    const seatNumbers = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'];
    seatNumbers.forEach((number) => {
      this.seats.set(number, { seatNumber: number, status: 'available' });
    });
  }

  getAllSeats() {
    return {
      seats: Array.from(this.seats.values()),
    };
  }

  getSeatsByUser(userId: string) {
    const userSeats = Array.from(this.seats.values()).filter(
      (seat) => seat.userId === userId,
    );
    return {
      userId,
      userSeats,
    };
  }

  async bookSeats(userId: string, seatNumbers: string[]) {
    const release = await this.mutex.acquire();
    try {
      const bookedSeats: string[] = [];
      const failedSeats: string[] = [];

      for (const seatNumber of seatNumbers) {
        const seat = this.seats.get(seatNumber);

        if (!seat || seat.status === 'booked') {
          failedSeats.push(seatNumber);
        } else {
          seat.status = 'booked';
          seat.userId = userId;
          bookedSeats.push(seatNumber);
        }
      }

      if (failedSeats.length > 0) {
        return {
          success: false,
          message: `Some seats could not be booked.`,
          bookedSeats,
          failedSeats,
        };
      }
      return {
        success: true,
        message: `Seats booked successfully.`,
        bookedSeats,
      };
    } finally {
      release();
    }
  }
}
