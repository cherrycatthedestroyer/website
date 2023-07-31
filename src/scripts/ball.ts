import p5Type from "p5";
import Matter, { Body, World} from "matter-js";

let Bodies = Matter.Bodies, Composite = Matter.Composite;

class Ball {
    x: number;
    y: number;
    r: number;
    body: Body;
    world: World;
    max_vel:Matter.Vector = {x: 5, y:5};
    state: string;
    isMovingRight: boolean;
    tries: number;

    constructor(x:number, y:number, r:number, world: World) {
        this.x = 0;
        this.y = 0;
        this.r = r;
        this.world = world;
        this.state = "IDLE";
        this.isMovingRight = true;
        let options = {
            friction: 0,
            restitution: 0.6
        }
        this.body = Bodies.circle(this.x, this.y, this.r, options);
        Composite.add(world, this.body);
        this.tries=0;
    }

    getBody(){
        return this.body;
    }

    getMaxVel(){
        return this.max_vel;
    }

    idleUpdate(){
        if (this.x<90 && this.isMovingRight){
            this.x+=3;
            if (this.x>=90){this.isMovingRight=false}
        }
        else if (this.x>-90 && !this.isMovingRight){
            this.x-=3;
            if (this.x<=-90){this.isMovingRight=true}
        }
        Body.setPosition(this.body,{x: this.x , y: -140});
    }

    drop(){
        Body.setStatic(this.body,false);
        this.state = "ACTIVE";
    }

    reset(){
        Body.setStatic(this.body,true);
        this.state = "IDLE";
        this.tries++;
    }

    show(p5: p5Type) {
        let pos = this.body.position;
        let angle = this.body.angle;
        if (this.state=="IDLE"){this.idleUpdate()}
        if (pos.y>200){this.reset()}
        p5.push();
        p5.translate(pos.x, pos.y);
        p5.rotate(angle);
        p5.ellipseMode(p5.CENTER);
        p5.fill(226,206,153);
        p5.ellipse(0, 0, this.r*2, this.r*2);
        p5.pop();
    }
}

export default Ball;