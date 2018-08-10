import { Component, OnInit } from '@angular/core';

import {GameService} from "../game.service"
@Component({
  selector: 'app-winnerview',
  templateUrl: './winnerview.component.html',
  styleUrls: ['./winnerview.component.css']
})
export class WinnerviewComponent implements OnInit {

  winner:string;
  lakePhrases:string[]=[
  ]
  constructor(public _gameService:GameService) { }
  initVars(){
    this.winner=this._gameService.getWinner()
    console.log(this.winner)
  }
  ngOnInit() {
    this.initVars();
  }

}
