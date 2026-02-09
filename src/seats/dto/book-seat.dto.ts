/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class BookSeatDto {
  @IsString()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString()
  seatNumbers: string[];
}
