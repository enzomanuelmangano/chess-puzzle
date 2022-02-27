import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Puzzle } from './puzzle.entity';

export interface GetPuzzleParams {
  apiKey: string;
}

@Injectable()
export class PuzzleService {
  constructor(
    @InjectRepository(Puzzle)
    private puzzleRepository: Repository<Puzzle>,
  ) {}

  getPuzzle(query: GetPuzzleParams) {
    console.log(query.apiKey);

    return this.puzzleRepository.findOne();
  }
}
