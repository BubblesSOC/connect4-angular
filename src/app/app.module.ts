import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { RowComponent } from './components/row/row.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { ResetButtonComponent } from './components/reset-button/reset-button.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    RowComponent,
    ScoreboardComponent,
    ResetButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
