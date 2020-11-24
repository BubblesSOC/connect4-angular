import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Color, WinningCoordinates } from '../../types';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {
  @Input()
  color: Color | undefined;

  @Input()
  row: number | undefined;

  @Input()
  column: number | undefined;

  @Input()
  winner: WinningCoordinates | null = null;

  @Output()
  dropCoin = new EventEmitter<number>();

  constructor() {}

  onDropCoin(): void {
    if (this.column || this.column === 0) {
      this.dropCoin.emit(this.column);
    }
  }

  // We want the winning cells to be animated to show
  // the user the winning strike
  shouldAnimate(): boolean {
    // if there is no winner yet or this cell has not yet
    // been played we won't have it glowing for sure
    if (!this.winner || !this.color) {
      return false;
    }

    for (const [x, y] of this.winner.combination) {
      const winningColumn = y + this.winner.column;
      const winningRow = x + this.winner.row;

      if (winningRow === this.row && winningColumn === this.column) {
        return true;
      }
    }

    return false;
  }

  ngOnInit(): void {}
}
