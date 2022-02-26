import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuzzleController } from './puzzle.controller';
import { Puzzle } from './puzzle.entity';
import { PuzzleService } from './puzzle.service';

@Module({
  imports: [TypeOrmModule.forFeature([Puzzle])],
  controllers: [PuzzleController],
  providers: [PuzzleService],
})
export class PuzzleModule {}
