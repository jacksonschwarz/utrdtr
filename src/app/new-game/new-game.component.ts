import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../game.service";
@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  constructor(private _router:Router, private _gameService:GameService) { }
  name:string;
  listOfPlayers:string[]

  maxNumberOfCards:number;
  dealer:string;
  addNewPlayer(){
    console.log(this.name)
    if(this.name){
        this.listOfPlayers.push(this.name)
        this.name="";

    }

  }
  removePlayer(aName){
    let idx=this.listOfPlayers.indexOf(aName);
    this.listOfPlayers.splice(idx, 1);
  }
  //save all options to the GameService and reroute to the scoreboard
  saveOptions(){
    this._gameService.setDealer(this.dealer);
    this._gameService.setListOfPlayers(this.listOfPlayers);
    this._gameService.setMaxNumberOfCards(this.maxNumberOfCards);
  }

  validateStartGame(){
    //if everything is cool in terms of players and numbers of cards possible, return true
    if(this.listOfPlayers.length == 0){
      //emit error dialog here
      
      return false;
    }
    else if(!this.dealer){
      //emit error dialog here
      return false;
    }
    else{
      return true;
    }
  }
  startGame(){
    if(this.validateStartGame()){
      console.log("Game should start from here")
      this.saveOptions()
      this._router.navigate(["scoreboard"])
    }

  }
  ngOnInit() {
    this.listOfPlayers=[]
  }

}
