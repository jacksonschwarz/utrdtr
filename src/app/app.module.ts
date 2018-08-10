import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';

import {MatButtonModule} from "@angular/material/button"
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table"
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatRadioModule} from "@angular/material/radio";
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { PlayerviewComponent } from './playerview/playerview.component';
import {RouterModule, Routes} from '@angular/router';
import { AddPlayerDialogComponent } from './add-player-dialog/add-player-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { WinnerviewComponent } from './winnerview/winnerview.component';
import { NewGameComponent } from './new-game/new-game.component';

const appRoutes:Routes=[
  {path:"scoreboard", component:ScoreboardComponent},
  {path:"newgame", component:NewGameComponent},
  {path:"winner", component:WinnerviewComponent},
  {path:"", redirectTo:"newgame",pathMatch:"full"}
]
@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    PlayerviewComponent,
    AddPlayerDialogComponent,
    ErrorDialogComponent,
    WinnerviewComponent,
    NewGameComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatRadioModule,
    FormsModule
  ],
  entryComponents:[
    AddPlayerDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
