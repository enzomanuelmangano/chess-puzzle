import { Controller, Get } from '@nestjs/common';
import { PuzzleService } from './puzzle.service';

@Controller('puzzle')
export class PuzzleController {
  constructor(private readonly puzzleService: PuzzleService) {}

  @Get()
  getHello() {
    return this.puzzleService.getTactic();
  }
}
