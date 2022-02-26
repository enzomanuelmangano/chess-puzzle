import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puzzle } from './puzzle.entity';

@Injectable()
export class PuzzleService {
  constructor(
    @InjectRepository(Puzzle)
    private puzzleRepository: Repository<Puzzle>,
  ) {}

  @Get()
  getTactic() {
    return this.puzzleRepository.findOne();
  }
}
