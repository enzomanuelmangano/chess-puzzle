import { Controller, Get, Query } from '@nestjs/common';
import { GetPuzzleParams, PuzzleService } from './puzzle.service';

@Controller('puzzle')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Get()
  getPuzzle(@Query() query: GetPuzzleParams) {
    return this.puzzleService.getPuzzle(query);
  }
}
