import { Combination } from './config';

export type Color = 'yellow' | 'red' | null;
export type BoardState = Color[][];

export interface GameScore {
  red: number;
  yellow: number;
}

export interface GameState {
  board: BoardState;
  score: GameScore;
}

export interface WinningCoordinates {
  row: number;
  column: number;
  combination: Combination;
  color: Color;
}
