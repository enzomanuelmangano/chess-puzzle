import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tactics')
export class Puzzle {
  @PrimaryGeneratedColumn({ name: 'PuzzleId' })
  id: string;

  @Column({ name: 'FEN' })
  fen: string;

  @Column({ name: 'Rating' })
  rating: string;
}
