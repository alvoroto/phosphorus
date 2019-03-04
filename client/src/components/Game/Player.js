export default function Player(game) {
    this.game = game;
   
    this.x = 100;
    this.y = 100;

    //last position
    this.lx = this.x;
    this.ly = this.y;
  
    this.img = new Image();
    this.img.src = '../../../images/greenBall.png';

    // número de imágenes diferentes
    this.img.frames = 12;
    this.img.framesTo = 0;
    this.img.framesFrom = 0;
    this.img.frameIndex = 0;
    this.img.framesX = 0;
    this.img.framesY = 0;
    this.img.framesW = 0;
    this.img.framesH = 0;
   

    
    // medidas de la imagen a representar en el canvas
    this.w = 27;
    this.h = 44;

    //velocidad
    this.vxInitial = 5;
    this.vx = 5;
    this.vy = 5;

    this.keys = [];

    this.jumping = false;
    this.doubleJumping = false;
    this.jumpDown = false;
    this.dashDown = false;
    this.breakDownDown = false;

    this.collectableItems = [];

    this.gravityVelocity= 1.5;

    this.jumpVelocity = 20;
    this.doubleJumpVelocity = 15;

    this.abailableDash = false;
    this.dashVelocity = 20;
    this.dashCheck = 0;
    this.dahsFrames = 10;
    this.dashing = false;

    this.abailableDoubleJump = false;

    this.abailableBreakDown = false;
    this.breakDownVelocity = 40;
    this.breakingDown = false;

    this.setListeners();

}

/*
    Dibuja el personaje en pantalla
*/
Player.prototype.draw = function() {
    this.game.ctx.drawImage(
        this.img,
        this.img.frameIndex * Math.floor(this.img.width / this.img.frames)+this.img.framesX,
        this.img.framesY,
        Math.floor(this.img.width / this.img.frames)+this.img.framesW,
        this.img.height+this.img.framesH,
        this.x,
        this.y,
        this.w,
        this.h
        );
}

/*
    Mueve hacia la derecha y si detecta una colision vuelve a la posicion anterior
*/
Player.prototype.moveRight = function(){
    this.lx = this.x
    this.x += this.vx;
    if(this.platformColision()){
        for(var i = this.vx; this.platformColision(); i--){
            this.x -= 1
        }
    }

}

/*
    Mueve hacia la izquierda y si detecta una colision vuelve a la posicion anterior
*/
Player.prototype.moveLeft = function(){
    this.lx = this.x
    this.x -= this.vx;
    if(this.platformColision()){
        for(var i = this.vx; this.platformColision(); i--){
            this.x += 1
        }
    }
}

/*
    Salta si le esta permitido
*/
Player.prototype.jump = function(){
    if(!this.jumping){
        this.jumping = true;
        this.vy -= this.jumpVelocity;
    }else if(!this.doubleJumping && this.abailableDoubleJump){
        this.doubleJumping = true;
        this.vy -= (this.vy+this.doubleJumpVelocity);
    }
}

/*
    Hace el dash si le esta permitido
    para ello comprueba las colisiones pixel a pixel con el for
*/
Player.prototype.dash = function(){
    if(this.abailableDash && this.keys[this.game.keys.LEFT_KEY]){
        this.dashCheck = this.game.framesCounter + this.dahsFrames;
        this.vx = this.dashVelocity;
        this.dashing = true;
        // for(var i=0; i<=this.dashVelocity; i++){
        //     this.lx = this.x
        //     this.x -= i;
        //     if(this.platformColision()){
        //         this.x = this.lx
        //     }
        // }
    } else if(this.abailableDash && this.keys[this.game.keys.RIGHT_KEY]){
        this.dashCheck = this.game.framesCounter + this.dahsFrames;
        this.vx = this.dashVelocity;
        this.dashing = true;
        // for(var i=0; i<=this.dashVelocity; i++){
        //     this.lx = this.x
        //     this.x += i;
        //     if(this.platformColision()){
        //         this.x = this.lx
        //     }
        // }
    }
}

Player.prototype.breakDown = function(){
    if(this.abailableBreakDown && this.jumping){
        this.vy += this.breakDownVelocity;
        // for(var i=0; i<=this.breakDownVelocity; i++){
        //     this.ly = this.y
        //     this.y += i;
        //     if(this.platformColision()){
        //         this.y = this.ly
        //     }
        // }
    } 
}

Player.prototype.move = function(){
    if(this.game.framesCounter > this.dashCheck % 1000){
        this.vx = this.vxInitial;
        this.dashing = false;
    }
    if (this.keys[this.game.keys.LEFT_KEY]) {
        this.moveLeft();
        if(this.vx >= this.dashVelocity){
            this.setAnimationParams(9,9)
        } else{
            this.setAnimationParams(0,3)
        }
    } else if (this.keys[this.game.keys.RIGHT_KEY]) {
        this.moveRight();
        if(this.vx >= this.dashVelocity){
            this.setAnimationParams(10,10)
        } else{
            this.setAnimationParams(4,7)
        }
    }else{
        if(this.vy >= this.breakDownVelocity){
            this.setAnimationParams(11,11)
        }else{
            this.setAnimationParams(8,8)
        }
    }
    this.animateRun();
   
}

/*
    Captura las pulsaciones de teclas
    Se guarda en un array la tecla pulsada en la posicion keycode con valor true en caso de que este pulsada
    Si se deja de pulsar, si quita del array la posicion keycode
    En caso de que se pulse espacio comprueba que tengas que levantar la tecla para volver a saltar
*/
Player.prototype.setListeners = function() {
    document.onkeydown = (function (e) {
        if (e.keyCode == this.game.keys.SPACE) {
            if(!this.jumpDown){
                this.jump();
                this.jumpDown = true;
            }
        } else if (e.keyCode == this.game.keys.D_KEY) {
            if(!this.dashDown){
                this.dash();
                this.dashDown = true;
            }
        } else if (e.keyCode == this.game.keys.F_KEY) {
            if(!this.breakDownDown){
                this.breakDown();
                this.breakDownDown = true;
            }
        } else {
            this.keys[e.keyCode] = true;
        }
    }.bind(this));

    document.onkeyup = (function (e) {
        if (e.keyCode == this.game.keys.SPACE) {
            this.jumpDown = false;
        }else if (e.keyCode == this.game.keys.D_KEY) {
            this.dashDown = false;
        }else if (e.keyCode == this.game.keys.F_KEY) {
            this.breakDownDown = false;
        }else {
            delete this.keys[e.keyCode];
        }
    }.bind(this));
}

/*
   Para la gravedad se da aceleracion aumentando la velocidad
   Se cambia la posicion sumando la velocidad a la posicion
   Se controla que haya colision con el suelo para podel saltar
   Si hay colision vuelvo a la posicion anterior y pongo la velocidad se resetea
*/
Player.prototype.gravity = function(){
    this.ly = this.y;
    this.vy += this.gravityVelocity;
    this.y += this.vy;
    if(this.platformColisionFloor()){
        this.jumping = false;
        this.doubleJumping = false;
    }
    if(this.platformColision()){
        this.y = this.ly;
        this.vy = 0;
    }
}

/*
    Coprueba si hay colision y devuelve el elemento con el que colisiona
*/
Player.prototype.platformColisionElem = function(elements){
    var col = false;
    var p = undefined;
    this.game.platforms.forEach(function(platform){
        if (this.x + this.w >= platform.x &&
            platform.x + platform.w >= this.x &&
            this.y + this.h >= platform.y &&
            platform.y + platform.h >= this.y
            ){
               p = platform
            }
    }.bind(this))
    return p;
}

/*
    Coprueba si hay colision y devuelve true
*/
Player.prototype.platformColision = function(elements){
    var col = false
    var p = undefined;
    var indexP = 0;
    this.game.platforms.forEach(function(platform, index){
        if (this.x + this.w > platform.x &&
            platform.x + platform.w >= this.x &&
            this.y + this.h > platform.y &&
            platform.y + platform.h > this.y
            ){
              col = true;
              p = platform;
              indexP = index;
            }
    }.bind(this))

    if(this.dashing){
        if(p && p.isDashBreakable){
            this.game.platforms.splice(indexP,1)
        }
    }
    if(this.vy>=this.breakDownVelocity){
        if(p && p.isDownBreakable){
            this.game.platforms.splice(indexP,1)
        }
    }
    return col;
}

/*
    Coprueba si hay colision con la base, como si fuese el suelo
*/
Player.prototype.platformColisionFloor = function(){
    var col = false
    this.game.platforms.forEach(function(platform){
        if (this.x + this.w > platform.x &&
            platform.x + platform.w >= this.x &&
            this.y + this.h> platform.y &&
            platform.y + platform.h > this.y + this.h
            ){
              col = true;
            }
    }.bind(this))
    return col;
}

/*
    Coprueba si hay colision con el item y devuelve true
*/
Player.prototype.itemColision = function(elements){
    var col = -1
    this.game.collectableItems.forEach(function(item, index){
        if (this.x + this.w > item.x &&
            item.x + item.w >= this.x &&
            this.y + this.h > item.y &&
            item.y + item.h > this.y
            ){
              col = index;
            }
    }.bind(this))
    return col;
}

Player.prototype.damageColision = function(elements){
    var col = -1
    this.game.damageItems.forEach(function(item, index){
        if (this.x + this.w > item.x &&
            item.x + item.w >= this.x &&
            this.y + this.h > item.y &&
            item.y + item.h > this.y
            ){
              col = index;
            }
    }.bind(this))
    return col;
}

Player.prototype.powerColision = function(elements){
    var col = -1
    this.game.powerItems.forEach(function(item, index){
        if (this.x + this.w > item.x &&
            item.x + item.w >= this.x &&
            this.y + this.h > item.y &&
            item.y + item.h > this.y
            ){
              col = index;
            }
    }.bind(this))
    return col;
}

Player.prototype.animateImg = function() {
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (this.game.framesCounter % 2 === 0) {
      this.img.frameIndex += 1;
  
      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > 25) this.img.frameIndex = 0;
    }
  };

  Player.prototype.animateRun = function() {
      
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if(this.img.frameIndex<this.img.framesFrom){
        this.img.frameIndex=this.img.framesFrom
    }
    if (this.game.framesCounter % 9 === 0) {
      this.img.frameIndex += 1;
      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > this.img.framesTo) this.img.frameIndex = this.img.framesFrom;
    }
  };

  Player.prototype.animateDash = function() {
      
    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if(this.img.frameIndex<this.img.framesFrom){
        this.img.frameIndex=this.img.framesFrom
    }
    if (this.game.framesCounter % 10 === 0) {
      this.img.frameIndex += 1;
      // Si el frame es el último, se vuelve al primero
      if (this.img.frameIndex > this.img.framesTo) this.img.frameIndex = this.img.framesFrom;
    }
  };

  Player.prototype.setAnimationParams = function(framesFrom, framesTo, framesX=0, framesY=0, framesW=0, framesH=0) {
    this.img.framesFrom = framesFrom;
    this.img.framesTo = framesTo;
    this.img.framesX = framesX;
    this.img.framesY = framesY;
    this.img.framesW = framesW;
    this.img.framesH = framesH;
  };

