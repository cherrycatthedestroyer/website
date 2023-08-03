import p5Type from "p5";
import Matter, { Body, World} from "matter-js";
import Ball from "./ball";

let Bodies = Matter.Bodies, Composite = Matter.Composite;

class Bumper {
    x: number;
    y: number;
    r: number;
    body: Body;
    world: World;
    isPulsing: boolean;
    colorTray: number[];

    constructor(x: number, y: number, r:number, world: World) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.world = world;
        let options = {
            friction: 0,
            restitution: 1,
            isStatic: true
        }
        this.body = Bodies.circle(this.x, this.y, this.r, options);
        Composite.add(world, this.body);
        this.isPulsing=false;
        this.colorTray = [222,49,33];
    }

    update(ball: Ball):boolean{
        if (ball.state==="ACTIVE"){
            let body = ball.getBody();
            if (Matter.Collision.collides(this.body,body,Matter.Pairs.create(null))?.collided != null){
                let newVel:Matter.Vector = {x:body.velocity.x*-2,y:body.velocity.y*-2};
                if (Matter.Vector.magnitude(ball.getMaxVel())-Matter.Vector.magnitude(newVel)>=0){
                    Body.setVelocity(body,{x:body.velocity.x*-2,y:body.velocity.y*-2});
                }
                this.isPulsing=true;
                return true;
            }
        }
        return false;
    }

    pulse(p5: p5Type){
        if (this.isPulsing){
            if (this.colorTray[0]<226){
                this.colorTray[0]++;
            }
            if (this.colorTray[1]<206){
                this.colorTray[1]+=10;
            }
            if (this.colorTray[2]<153){
                this.colorTray[2]+=10;
            }
            if (this.colorTray[0]>=226 && this.colorTray[1]>=206 && this.colorTray[2]>=153){
                this.colorTray = [226,206,153];
                this.isPulsing=false;
            }
        }
        else{
            if (this.colorTray[0]>222){
                this.colorTray[0]--;
            }
            if (this.colorTray[1]>49){
                this.colorTray[1]-=10;
            }
            if (this.colorTray[2]>33){
                this.colorTray[2]-=10;
            }
            if (this.colorTray[0]<=222 && this.colorTray[1]<=49 && this.colorTray[2]<=33){
                this.colorTray = [222,49,33];
                this.isPulsing=false;
            }
        }
    }

    show(p5: p5Type) {
        let pos = this.body.position;
        this.pulse(p5);
        p5.push();
        p5.translate(pos.x, pos.y);
        p5.ellipseMode(p5.CENTER);
        p5.strokeWeight(1);
        p5.noStroke();
        p5.fill(this.colorTray[0],this.colorTray[1],this.colorTray[2]);
        p5.ellipse(0, 0, this.r*2);
        p5.pop();
    }
}

export default Bumper;