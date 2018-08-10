export class Player {
    public name;
    public bid;
    public tricksTaken;
    public score;
    public totalScore;
    constructor(aName){
        this.name=aName;
        this.bid=0;
        this.tricksTaken=0;
        this.score=0;
        this.totalScore=0;
    }
}
