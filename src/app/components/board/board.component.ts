import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardState, Color, WinningCoordinates, GameScore } from '../../types';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  board: BoardState;
  color: Color; // current player
  winner: WinningCoordinates | null;
  score: GameScore;

  private _sub: Subscription | undefined;

  constructor(private _gameService: GameService) {
    this.board = this._gameService.board;
    this.color = this._gameService.currentPlayer;
    this.winner = this._gameService.winner;
    this.score = this._gameService.score;
  }

  dropCoin(column: number): void {
    // we only allow a player to drop a coin if there is no winner yet
    if (!this.winner) {
      this._gameService.$dropCoin(column, this.color);
    }
  }

  resetBoard(): void {
    this._gameService.$resetBoard();
  }

  displayHeader(): string {
    // only display the winner if there is one
    if (this.winner) {
      return `Congratulations, ${this.winner.color} wins the game!`;
    } else {
      return `It's ${this.color}'s turn to play`;
    }
  }

  ngOnInit(): void {
    this._sub = this._gameService.gameState$.subscribe(_ => {
      this.board = this._gameService.board;
      this.color = this._gameService.currentPlayer;
      this.winner = this._gameService.winner;
      this.score = this._gameService.score;
    });
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}
