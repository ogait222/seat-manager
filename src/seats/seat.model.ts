export type SeatStatus = 'available' | 'booked';

export interface Seat {
  seatNumber: string;
  status: SeatStatus;
  userId?: string;
}
