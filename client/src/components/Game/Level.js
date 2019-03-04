import Background from "./Background";

export default class Level{
    constructor(){
        this.platforms = [];
        this.collectableItems = [];
        this.damageItems = [];
        this.powerItems = [];
        this.frontImages=[];
        this.backImages=[];
        this.background = new Background();
        this.playerX = 0;
        this.playerY = 0;
    }
}

