import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { WinningCoordinates } from '../../types';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetButtonComponent implements OnInit {
  @Input()
  winner: WinningCoordinates | null = null;

  @Output()
  resetBoard = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
