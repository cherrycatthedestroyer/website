import p5Type from "p5";
import Matter, { Body, World} from "matter-js";

let Bodies = Matter.Bodies, Composite = Matter.Composite;

class Boundary {
    x: number;
    y: number;
    w: number;
    h: number;
    body: Body;
    world: World;

    constructor(x: number, y: number, w:number, h:number, world: World) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.world = world;
        let options = {
            friction: 0,
            restitution: 1,
            isStatic: true
        }
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
        Composite.add(world, this.body);
    }

    rotate(angle: number){
        Body.rotate(this.body,angle*Math.PI/180);
    }

    show(p5: p5Type) {
        let pos = this.body.position;
        let angle = this.body.angle;
        p5.push();
        p5.translate(pos.x, pos.y);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.strokeWeight(1);
        p5.noStroke();
        p5.fill(222,49,33);
        p5.rect(0, 0, this.w, this.h);
        p5.pop();
    }
}

export default Boundary;