import { Component, OnInit } from '@angular/core';
import {
  GameService,
  BoardState,
  Color,
  WinningCoordinates
} from '../../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board: BoardState | undefined;
  color: Color | undefined;
  winner: WinningCoordinates | null = null;

  constructor(private _gameService: GameService) {}

  displayHeader(): string {
    // only display the winner if there is one
    if (this.winner) {
      return `Congratulations, ${this.winner.color} wins the game!`;
    } else {
      return `It's ${this.color}'s turn to play`;
    }
  }

  ngOnInit(): void {
    this._gameService.gameState$.subscribe(state => {
      this.board = state.board;
      this.color = this._gameService.getCurrentPlayer(state);
      this.winner = this._gameService.getWinner(state);
      console.log(this.board);
    });
  }
}
