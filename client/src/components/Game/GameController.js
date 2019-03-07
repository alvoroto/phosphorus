import Background from "./Background";
import Player from "./Player";
import Level from "./Level";
import Platform from "./Platform";
import Item from "./Item";
import Images from "./Images";


export default class GameController {
    constructor(){
        this.totalGame = undefined;
        this.canvas = undefined;
        this.ctx = undefined;
        this.fps = 100;
        this.keys = {
            TOP_KEY: 38,
            SPACE: 32,
            LEFT_KEY: 37,
            RIGHT_KEY: 39,
            D_KEY: 68,
            F_KEY: 70
        };
        this.platforms = [];
        this.collectableItems = [];
        this.damageItems = [];
        this.powerItems = [];
        this.currentLevel = 0;
        this.levels = [];
        this.frontImages = [];
        this.backImages = [];
        this.framesCounter = 0;
    }
    


    /*
    Inicio del juego
    */
    init(canvasId, totalGame) {
        this.totalGame = totalGame;
        this.canvas = canvasId;
        this.ctx = this.canvas.getContext("2d");
        this.fps = 60;

        this.reset();

        //this.song = new Audio("./audio/greenpath.mp3");
        //var playPromise = this.song.play();


        this.background = new Background(this.ctx, this.canvas.width, this.canvas.height);
        this.player = new Player(this)

        this.loadData();
        this.loadLevel();
        


        /*
            Loop de animacion
        */
        this.interval = setInterval(function () {
            this.clear();

            this.framesCounter++;

            // controlamos que frameCounter no sea superior a 1000
            if (this.framesCounter > 1000) {
                this.framesCounter = 0;
            }

            this.player.gravity();
            this.player.move();
            this.detectItemCollision();
            this.detectDamageCollision();
            this.detectPowerCollision();
            this.drawAll(this.framesCounter);

        }.bind(this), 1000 / this.fps);
    }

    //reseteamos todos los elementos del juego para empezar en un estado limpio
    reset() {
        this.background = new Background(this.ctx, this.canvas.width, this.canvas.height);
        this.player = new Player(this)
        this.framesCounter = 0;
    }

    //limpieza de la pantalla
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawPlatforms() {
        this.platforms.forEach(function(platform) {
            platform.draw();
        })
    }

    drawCollectItems(framesCounter) {
        this.collectableItems.forEach(function (collectItem) {
            if (collectItem.isActive) {
                collectItem.draw();
                collectItem.animateItem(framesCounter);
            }
        })
    }

    drawDamageItems(framesCounter) {
        this.damageItems.forEach(function (damageItem) {
            if (damageItem.isActive) {
                damageItem.draw();
                damageItem.animateItem(framesCounter);
            }
        })
    }

    drawPowerItems(framesCounter) {
        this.powerItems.forEach(function (powerItem) {
            if (powerItem.isActive) {
                powerItem.draw();
                powerItem.animateItem(framesCounter);
            }
        })
    }

    drawBackImages() {
        this.backImages.forEach(function (images) {
            images.draw();
        })
    }

    drawFrontImages() {
        this.frontImages.forEach(function (images) {
            images.draw();
        })
    }

    drawAll(framesCounter) {
        this.background.draw();
        this.drawBackImages()
        this.drawPlatforms();
        this.drawCollectItems(framesCounter);
        this.drawDamageItems(framesCounter);
        this.drawPowerItems(framesCounter);
        this.player.draw();
        this.drawFrontImages()
    }

    detectItemCollision() {
        var colItem = this.player.itemColision()
        if (colItem >= 0) {
            if (this.collectableItems[colItem].isActive) {
                this.collectableItems[colItem].isActive = false;
                this.player.collectableItems.push(this.collectableItems[colItem])
                if (this.collectableItems.length > colItem + 1) {
                    this.collectableItems[colItem + 1].isActive = true;
                } else{
                    this.changeLevel();
                }
            }
        }
    }

    detectDamageCollision() {
        var colItem = this.player.damageColision()
        if (colItem >= 0) {
            if (this.damageItems[colItem].isActive) {
                this.loadLevelData()
                this.loadLevel();
            }
        }
    }

    detectPowerCollision() {
        var colItem = this.player.powerColision()
        if (colItem >= 0) {
            if (this.powerItems[colItem].isActive) {
                this.powerItems[colItem].isActive = false;
                if(this.powerItems[colItem].type == "dash"){
                    this.player.abailableDash = true;
                }else if(this.powerItems[colItem].type == "down"){
                    this.player.abailableBreakDown = true;
                }else if(this.powerItems[colItem].type == "jump"){
                    this.player.abailableDoubleJump = true;
                }
            }
        }
    }

    changeLevel(){
        this.currentLevel++;
        if(this.currentLevel < this.levels.length){
           this.loadLevel();
        }
    }

    loadLevel(){
        this.platforms = this.levels[this.currentLevel].platforms;
        this.collectableItems = this.levels[this.currentLevel].collectableItems;
        this.damageItems = this.levels[this.currentLevel].damageItems;
        this.powerItems = this.levels[this.currentLevel].powerItems;
        this.backImages = this.levels[this.currentLevel].backImages;
        this.frontImages = this.levels[this.currentLevel].frontImages;
        this.background.img.src = this.levels[this.currentLevel].background.img.src;
        this.player.x = this.levels[this.currentLevel].playerX;
        this.player.y = this.levels[this.currentLevel].playerY;
        this.player.abailableDash = false;
        this.player.abailableBreakDown = false;
        this.player.abailableDoubleJump = false;

    }

    loadData(){
        this.totalGame.forEach(function(level){
            var nivel = new Level(this)

            //platforms
            level.platforms.forEach(function(platform){
                nivel.platforms.push(new Platform(this, platform.img, platform.x, platform.y, platform.w, platform.h, platform.isDashBreakable, platform.isDownBreakable));
            }.bind(this))
           
            //collectable items
            level.collectableItems.forEach(function(collectableItem){
                nivel.collectableItems.push(new Item(this.ctx, collectableItem.src, collectableItem.x, collectableItem.y, collectableItem.w, collectableItem.h, collectableItem.isActive))
            }.bind(this))

             //damage items
            if(level.damageItems){
                level.damageItems.forEach(function(damageItem){
                    nivel.damageItems.push(new Item(this.ctx, damageItem.src, damageItem.x, damageItem.y, damageItem.w, damageItem.h, damageItem.isActive, damageItem.damage))
                }.bind(this))
            }

             //power items
             if(level.powerItems){
                level.powerItems.forEach(function(powerItem){
                    nivel.powerItems.push(new Item(this.ctx, powerItem.src, powerItem.x, powerItem.y, powerItem.w, powerItem.h, powerItem.isActive, powerItem.damage, powerItem.type))
                }.bind(this))
            }

             //back images
             if(level.backImages){
                level.backImages.forEach(function(backImage){
                    nivel.backImages.push(new Images(this.ctx, backImage.x, backImage.y, backImage.w, backImage.h, backImage.src))
                }.bind(this))
            }

            //front images
            if(level.frontImages){
                level.frontImages.forEach(function(frontImage){
                    nivel.frontImages.push(new Images(this.ctx, frontImage.x, frontImage.y, frontImage.w, frontImage.h, frontImage.src))
                }.bind(this))
            }

            //background
            nivel.background = new Background(this.ctx, this.canvas.width, this.canvas.height, level.background.src);

            //player
            nivel.playerX = level.player.x;
            nivel.playerY = level.player.y;


            this.levels.push(nivel);
        }.bind(this))
    }

    loadLevelData(){
            var nivel = new Level(this)

            //platforms
            this.totalGame[this.currentLevel].platforms.forEach(function(platform){
                nivel.platforms.push(new Platform(this, platform.img, platform.x, platform.y, platform.w, platform.h, platform.isDashBreakable, platform.isDownBreakable));
            }.bind(this))
           
            //collectable items
            this.totalGame[this.currentLevel].collectableItems.forEach(function(collectableItem){
                nivel.collectableItems.push(new Item(this.ctx, collectableItem.src, collectableItem.x, collectableItem.y, collectableItem.w, collectableItem.h, collectableItem.isActive))
            }.bind(this))

             //damage items
            if(this.totalGame[this.currentLevel].damageItems){
                this.totalGame[this.currentLevel].damageItems.forEach(function(damageItem){
                    nivel.damageItems.push(new Item(this.ctx, damageItem.src, damageItem.x, damageItem.y, damageItem.w, damageItem.h, damageItem.isActive, damageItem.damage))
                }.bind(this))
            }

             //power items
             if(this.totalGame[this.currentLevel].powerItems){
                this.totalGame[this.currentLevel].powerItems.forEach(function(powerItem){
                    nivel.powerItems.push(new Item(this.ctx, powerItem.src, powerItem.x, powerItem.y, powerItem.w, powerItem.h, powerItem.isActive, powerItem.damage, powerItem.type))
                }.bind(this))
            }

             //back images
             if(this.totalGame[this.currentLevel].backImages){
                this.totalGame[this.currentLevel].backImages.forEach(function(backImage){
                    nivel.backImages.push(new Images(this.ctx, backImage.x, backImage.y, backImage.w, backImage.h, backImage.src))
                }.bind(this))
            }

            //front images
            if(this.totalGame[this.currentLevel].frontImages){
                this.totalGame[this.currentLevel].frontImages.forEach(function(frontImage){
                    nivel.frontImages.push(new Images(this.ctx, frontImage.x, frontImage.y, frontImage.w, frontImage.h, frontImage.src))
                }.bind(this))
            }

            //background
            nivel.background = new Background(this.ctx, this.canvas.width, this.canvas.height, this.totalGame[this.currentLevel].background.src);

            //player
            nivel.playerX = this.totalGame[this.currentLevel].player.x;
            nivel.playerY = this.totalGame[this.currentLevel].player.y;


            this.levels[this.currentLevel]=nivel;
    }

}