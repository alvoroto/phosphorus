export default class Platform{
    constructor(game, src, x, y, w, h, isDashBreakable = false, isDownBreakable = false){
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isDashBreakable = isDashBreakable;
        this.isDownBreakable = isDownBreakable;
        // número de imágenes diferentes
        this.img = new Image();
        this.img.src = src;
        this.img.frames = 1;
        this.img.framesTo = 1;
        this.img.framesFrom = 1;
        this.img.frameIndex = 0;
        this.img.framesX = 0;
        this.img.framesY = 0;
        this.img.framesW = 0;
        this.img.framesH = 0;
    }

    draw(){
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

}
