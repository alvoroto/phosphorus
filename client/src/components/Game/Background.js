export default class Background {

    constructor(ctx, w, h, src="../../../images/black.png"){
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = src;
        
        this.x = 0;
        this.y = 0;
        this.w = w;
        this.h = h;
    
        this.dx = 10;
    }

    draw () {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
      
}