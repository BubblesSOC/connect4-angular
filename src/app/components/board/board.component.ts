import { Component, OnInit } from '@angular/core';
import { BoardState, Color, WinningCoordinates } from '../../types';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: BoardState;
  color: Color; // current player
  winner: WinningCoordinates | null;

  constructor(private _gameService: GameService) {
    this.board = this._gameService.board;
    this.color = this._gameService.currentPlayer;
    this.winner = this._gameService.winner;
  }

  dropCoin(column: number): void {
    // we only allow a player to drop a coin if there is no winner yet
    if (!this.winner) {
      this._gameService.$dropCoin(column, this.color);
    }
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
    this._gameService.gameState$.subscribe(_ => {
      this.board = this._gameService.board;
      this.color = this._gameService.currentPlayer;
      this.winner = this._gameService.winner;
    });
  }
}
