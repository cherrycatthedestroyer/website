import p5Type from "p5";

class Star {
    x: number;
    y: number;
    r: number;
    alpha: number;
    maxAlpha: number;
    isOut: boolean;
    vel: p5Type.Vector;
    bounds: p5Type.Vector;

    constructor(x: number, y: number, r: number, alpha: 
        number, vel: p5Type.Vector, bounds: p5Type.Vector) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.alpha = 0;
        this.maxAlpha = alpha;
        this.isOut = false;
        this.vel = vel;
        this.bounds = bounds;
    }

    move(){
        this.x += this.vel.x*(0.2);
        this.y += this.vel.y*(0.2);
        this.r += 0.001;
        if (this.alpha<this.maxAlpha){
            this.alpha+=0.5;
        }
        if (this.x>this.bounds.x || this.x<0 || this.y>this.bounds.y || this.y<0){
            this.isOut=true;
        }
    }

    show(p5: p5Type) {
        this.move();
        p5.push();
        p5.translate(this.x,this.y);
        p5.ellipseMode(p5.CENTER);
        p5.fill(255,this.alpha);
        p5.ellipse(0,0,this.r*2);
        p5.pop();
    }
}

export default Star;