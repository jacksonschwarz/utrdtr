import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private listOfPlayers:string[]
  private winner:string;
  private maxNumberOfCards:number;
  private dealer:string;
  constructor() { }
  public setListOfPlayers(aListOfPlayers:string[]){
    this.listOfPlayers=aListOfPlayers
  }
  public getListOfPlayers(){
    return this.listOfPlayers
  }
  public setWinner(aPlayerName:string){
    this.winner=aPlayerName
  }
  public getWinner(){
    return this.winner;
  }
  public getMaxNumberOfCards(){
    return this.maxNumberOfCards;
  }
  public setMaxNumberOfCards(aNumber){
    this.maxNumberOfCards=aNumber;
  }
  public setDealer(aName){
    this.dealer=aName;
  }
  public getDealer(){
    return this.dealer;
  }
  public resetAll(){
    this.listOfPlayers=null;
    this.winner=null;
    this.maxNumberOfCards=null;
    this.dealer=null;
  }

}
