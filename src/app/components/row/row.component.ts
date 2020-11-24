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
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent implements OnInit {
  @Input()
  colors: Color[] | undefined;

  @Input()
  row: number | undefined;

  @Input()
  winner: WinningCoordinates | null = null;

  @Output()
  dropCoin = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
