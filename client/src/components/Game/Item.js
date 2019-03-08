export default class Item {

    constructor(ctx,src, x, y, w, h, isActive, damage=false, type=""){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isActive = isActive;
        this.type = type;
        this.img = new Image();
        this.img.src = src;
        this.damage = damage;
        // número de imágenes diferentes
        this.img.frames = 1;
        this.img.framesTo = 0;
        this.img.framesFrom = 0;
        this.img.frameIndex = 0;
        this.img.framesX = 0;
        this.img.framesY = 0;
        this.img.framesW = 0;
        this.img.framesH = 0;
    }

    draw(){
        if(this.isActive){
            this.ctx.drawImage(
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
    }

    animateItem(framesCounter) {
        
        // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
        if(this.img.frameIndex<this.img.framesFrom){
            this.img.frameIndex=this.img.framesFrom
        }
        if (framesCounter % 10 === 0) {
        this.img.frameIndex += 1;
        // Si el frame es el último, se vuelve al primero
        if (this.img.frameIndex > this.img.framesTo) this.img.frameIndex = this.img.framesFrom;
        }
    };

    setAnimationParams(framesFrom, framesTo, framesX=0, framesY=0, framesW=0, framesH=0) {
        this.img.framesFrom = framesFrom;
        this.img.framesTo = framesTo;
        this.img.framesX = framesX;
        this.img.framesY = framesY;
        this.img.framesW = framesW;
        this.img.framesH = framesH;
    };
    
}   


// function HelloItem(game, x, y, w, h, isActive){
//     Item.call(this, game, x, y, w, h, isActive);
//     this.type = "hello";
//     this.img = new Image();
//     this.img.src = 'img/hello_anim.png';
//     // número de imágenes diferentes
//     this.setAnimationParams(0,7)
//     this.img.frames = 8;
//     this.img.frameIndex = 1;
// }
// HelloItem.prototype = Object.create(Item.prototype);
// HelloItem.prototype.constructor = HelloItem;

// function WorldItem(game, x, y, w, h, isActive){
//     Item.call(this, game, x, y, w, h, isActive);
//     this.type = "world";
//     this.img = new Image();
//     this.img.src = 'img/world_anim.png';
//     // número de imágenes diferentes
//     this.setAnimationParams(0,7)
//     this.img.frames = 8;
//     this.img.frameIndex = 1;
// }
// WorldItem.prototype = Object.create(Item.prototype);
// WorldItem.prototype.constructor = WorldItem;

// function EndItem(game, x, y, w, h, isActive){
//     Item.call(this, game, x, y, w, h, isActive);
//     this.type = "end";
//     this.img = new Image();
//     this.img.src = 'img/p_low_end_anim.png';
//     // número de imágenes diferentes
//     this.setAnimationParams(0,7)
//     this.img.frames = 8;
//     this.img.frameIndex = 1;
// }
// EndItem.prototype = Object.create(Item.prototype);
// EndItem.prototype.constructor = EndItem;



