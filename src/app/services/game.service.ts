import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, share } from 'rxjs/operators';
import {
  boardHeight,
  boardWidth,
  Combination,
  winningCombinations
} from '../config';

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

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly initialState: GameState;
  readonly gameState$: Observable<GameState>;

  private _gameState: BehaviorSubject<GameState>;

  constructor() {
    this.initialState = {
      board: this.getInitialBoard(),
      score: {
        red: 0,
        yellow: 0
      }
    };
    this._gameState = new BehaviorSubject<GameState>(this.initialState);
    this.gameState$ = this._gameState.asObservable();
  }

  // dropCoin(column: number, color: Color): BoardState {
  //   const state = this._gameState.getValue().board;
  //   let validRow = null;

  //   for (let row = 0; row < state.length; row++) {
  //     if (state[row][column] === null) {
  //       validRow = row;
  //     }
  //   }

  //   if (validRow === null) {
  //     return state;
  //   }

  //   const newState = [...state];
  //   newState[validRow] = [...newState[validRow]];
  //   newState[validRow][column] = color;

  //   return newState;
  // }

  /**
   * return an empty board according to the sizes
   * set in the config
   */
  getInitialBoard(): BoardState {
    const board: BoardState = [];

    for (let row = 0; row < boardHeight; row++) {
      const gameRow = [];

      for (let column = 0; column < boardWidth; column++) {
        gameRow.push(null);
      }

      board.push(gameRow);
    }

    return board;
  }

  /**
   * Return the current player (as a color) given a board game.
   */
  getCurrentPlayer(state: GameState): Color {
    let reds = 0;
    let yellows = 0;

    for (const row of state.board) {
      for (const cell of row) {
        if (cell === 'red') {
          reds++;
        } else if (cell === 'yellow') {
          yellows++;
        }
      }
    }

    return reds === yellows ? 'yellow' : 'red';
  }

  /**
   * Test every possible winning combinations against the
   * current game board
   */
  getWinner(state: GameState): WinningCoordinates | null {
    for (const combination of winningCombinations) {
      const winner = this.testCombination(state.board, combination);

      if (winner) {
        return winner;
      }
    }

    return null;
  }

  /**
   * Test if a combination is valid for a given board
   * @param state the game board
   * @param combination a winning combination configuration
   */
  testCombination(
    state: BoardState,
    combination: Combination
  ): WinningCoordinates | null {
    for (let row = 0; row < state.length; row++) {
      for (let column = 0; column < state[row].length; column++) {
        // only run if the current cell has a color
        if (state[row][column] !== null) {
          const color = this.testCombinationAt(state, combination, row, column);

          if (color) {
            return { color, row, column, combination };
          }
        }
      }
    }

    return null;
  }

  /**
   * Test is a given combination is successfull
   * at a given a column and row coordinate
   *
   * @param state the game board
   * @param combination a winning combination configuration
   * @param row a row coordinate on the board
   * @param column a column coordinate on the board
   */
  testCombinationAt(
    state: BoardState,
    combination: Combination,
    row: number,
    column: number
  ): Color {
    // this is the original cell color, we'll confirm that every
    // cell referred by the combination is the same
    const cell = state[row][column];

    for (const [x, y] of combination) {
      const nextRow = row + x;
      const nextColumn = column + y;

      // if the next cell falls outside the board or the next cell
      // does not contain a color, we consider the combination to be invalid
      if (!state[nextRow] || !state[nextRow][nextColumn]) {
        return null;
      }

      // if we found a different color the combination is also invalid
      if (cell !== state[nextRow][nextColumn]) {
        return null;
      }
    }

    return cell;
  }
}
