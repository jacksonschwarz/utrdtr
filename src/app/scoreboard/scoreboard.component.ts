import { Component, OnInit } from '@angular/core';
import {Player} from "../player"
import {MatDialog, MatDialogRef} from "@angular/material/dialog"
import {AddPlayerDialogComponent} from "../add-player-dialog/add-player-dialog.component"
import {MatTableDataSource} from "@angular/material/table"

import {GameService} from "../game.service";

import {Router} from "@angular/router";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  players:Player[]=[]
  scoreboardDisplayedColumns:string[]=["player"]
  bidsDisplayedColumns:string[]=["order", "player", "bids", "tricksTaken", "isDealer"]
  scoreboardTableDef:any[]=[];
  bidTableDef:any[]=[];
  stages:string[]=["BIDDING", "PLAY_HANDS"]
  currentStageIndex=0;
  currentStage:string;
  biddingOver:boolean=false;
  tricksDisabled:boolean=true; 

  maxCardsInGame:number;
  maxCardsArray:string[]=[]
  currentHand:number=0;

  scoreboardDataSource=new MatTableDataSource();
  biddingDataSource=new MatTableDataSource();

  currentDealer:string;
  constructor(public _router:Router, public dialog:MatDialog, public _gameService:GameService) { }
  initializeGame(){
    this.currentStage=this.stages[this.currentStageIndex]
    //TODO: REMOVE DUMMY VARIABLES
    // this.maxCardsInGame=5
    // this.addPlayer("Jackson")
    // this.addPlayer("Keith")
    // this.addPlayer("Grace")
    // this.addPlayer("Paul")
    // this.addPlayer("Suzy")

    let playerList=this._gameService.getListOfPlayers();
    if(!playerList){
      this._router.navigate(["newgame"])
      return;
    }
    this.currentDealer=this._gameService.getDealer();
    for(let player of playerList){
      this.addPlayer(player)
    }
    this.maxCardsInGame=this._gameService.getMaxNumberOfCards();
    for(let i=1;i<=this.maxCardsInGame;i++){
      this.maxCardsArray.push(i+"");
      this.scoreboardDisplayedColumns.push("score"+i)
    }
    for(let i=this.maxCardsInGame;i >= 1;i--){
      this.maxCardsArray.push("-"+i);
      this.scoreboardDisplayedColumns.push("score-"+i)
    }
    this.scoreboardDisplayedColumns.push("total")
  }
  onBidsEntered(){
    if(this.checkBids()){
      this.biddingOver=true;
      this.currentStage=this.stages[1]
      this.tricksDisabled=false;
    }
    else{
      this.showBiddingError();
    }

  }
  getBidSum(){
    let bidSum=0;
    for(let row of this.bidTableDef){
      bidSum+=row.bids
    }
    return bidSum;
  }
  checkBids(){
    let bidSum=0;
    for(let row of this.bidTableDef){
      bidSum+=row.bids
    }

    return bidSum != Math.abs(parseInt(this.maxCardsArray[this.currentHand]))
  }
  reshufflePlayerOrder(){
    this.bidTableDef=this.bidTableDef.sort((a, b)=>{
      return a.order-b.order
    })
    this.biddingDataSource.data=this.bidTableDef
  }
  increasePlayerOrder(row){
    if(row.order <= this.bidTableDef.length-1){
      row.order++;
    }
    console.log("ROW ORDER ",row.order)
    
    this.reshufflePlayerOrder();
    

  }
  decreasePlayerOrder(row){
    if(row.order >= 0){
      row.order--;
    }
    console.log("ROW ORDER ",row.order)
    this.reshufflePlayerOrder()
    
  }
  showBiddingError(){

  }
  incrementCurrentDealer(){
    let currentDealerIdx;
    for(let i=0;i<this.bidTableDef.length;i++){
      console.log(this.bidTableDef[i])
      
      if(this.bidTableDef[i].isDealer){
        currentDealerIdx=i;
        break;
      }
    }

    this.bidTableDef[currentDealerIdx].isDealer=false;
    if(currentDealerIdx+1 < this.bidTableDef.length){
      this.bidTableDef[currentDealerIdx+1].isDealer=true
    }
    else{
      this.bidTableDef[0].isDealer=true
    }
    console.log(this.bidTableDef)

    this.biddingDataSource.data=this.bidTableDef
  }
  onHandScored(){
    this.scoreGame();
    this.biddingOver=false;
    this.currentStage=this.stages[0]
    this.scoreboardDataSource.data=this.scoreboardTableDef.sort((a, b)=>{
      return b.totalScore-a.totalScore
    })
    this.incrementCurrentDealer()
    if(this.currentHand==this.maxCardsArray.length){
      this._gameService.setWinner(this.scoreboardDataSource.data[0]["name"])
      this._router.navigate(["winner"])
    }
    
  }
  scoreGame(){
    for(let row of this.bidTableDef){
      let idx=this.bidTableDef.indexOf(row);
      let player=this.players[idx]
      let playerScore=0;
      //award points for each trick won
      
      // player.score+=row.tricksTaken
  
      playerScore+=row.tricksTaken;
      //award 10 points if the trick and bid numbers where the same
      if(row.bids == row.tricksTaken){
        // player.score+=10;
        playerScore+=10

      
        //double the score if the amount of tricks taken is also equal to the number of cards out
        if(row.bids == Math.abs(parseInt(this.maxCardsArray[this.currentHand]))){
          // player.score*=2;
          playerScore*=2
      
        }
        
      }

      this.scoreboardTableDef[idx].totalScore+=playerScore;
      player.score+=playerScore;
      this.scoreboardTableDef[idx]["score"+this.currentHand]=playerScore;
      row.tricksTaken=0;
      row.bids=0;
    }
    this.tricksDisabled=true;
    this.currentHand++; 
  }
  previousStage(){
    if(this.stages.indexOf(this.currentStage) == 1){
      this.currentStage=this.stages[0]
      this.biddingOver=false
    }
    this.tricksDisabled=true;
  }
  addPlayer(playerName){
    console.log("Adding ",playerName)
    let player=new Player(playerName);
    this.players.push(player)
    console.log(this.players)
    let bidRow={"name":player.name, "bids":player.bid, "tricksTaken":0, "isDealer":player.name == this.currentDealer, order:this.players.indexOf(player)}    
    this.bidTableDef.push(bidRow);
    this.biddingDataSource.data=this.bidTableDef;
    let tableRow={"name":player.name, "totalScore":0, "remove":player}
    
    //represents score in the i-th round
    for(let i=0;i<=this.maxCardsInGame*2;i++){
      tableRow["score"+i]=0
    }
    this.scoreboardTableDef.push(tableRow)
    this.scoreboardDataSource.data=this.scoreboardTableDef;
    console.log("Scoreboard Table Def ", this.scoreboardTableDef)

  }
  showAddPlayerDialog(){
    const dialogRef=this.dialog.open(AddPlayerDialogComponent, {
      width:"250px",
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.addPlayer(result);
        
      }
    })
  }
  removePlayer(aPlayer){
    let idx=this.players.indexOf(aPlayer)
    this.players.splice(idx, 1)
    this.scoreboardTableDef.splice(idx, 1);
    this.bidTableDef.splice(idx, 1);

    this.scoreboardDataSource.data=this.scoreboardTableDef;
    this.biddingDataSource.data=this.bidTableDef;
  }
  showRemovePlayerDialog(){

  }
  addBid(aPlayer){
    let idx=this.bidTableDef.indexOf(aPlayer)
    this.bidTableDef[idx].bids++;
  }
  subtractBid(aPlayer){

    let idx=this.bidTableDef.indexOf(aPlayer)
    if(this.bidTableDef[idx].bids > 0){
      this.bidTableDef[idx].bids--;
    }
  }
  addTrickTaken(aPlayer){
    let idx=this.bidTableDef.indexOf(aPlayer)
    this.bidTableDef[idx].tricksTaken++;
  }
  subtractTrickTaken(aPlayer){
    let idx=this.bidTableDef.indexOf(aPlayer)
    this.bidTableDef[idx].tricksTaken--;
  }
  ngOnInit() {
    this.initializeGame()
  }

}
