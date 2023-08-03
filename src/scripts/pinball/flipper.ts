import p5Type from "p5";
import Matter, { Body, World} from "matter-js";

let Bodies = Matter.Bodies, Composite = Matter.Composite;

class Flipper {
    x: number;
    y: number;
    angle: number;
    scaler: number;
    isMoving: boolean;
    isMovingUp: boolean;
    orientation: string;
    body: Body;
    world: World;

    constructor(scaler:number, orientation:string, world: World) {
        this.x = orientation=="LEFT"? -40 : 90;
        this.y = 157.75;
        this.scaler = scaler;
        this.world = world;
        this.isMoving = false;
        this.isMovingUp = false;
        this.angle = 25;
        this.orientation = orientation;
        if (this.orientation == "RIGHT"){ this.scaler *= -1; this.angle *= -1};
        let options = {
            friction: 0,
            restitution: 1,
            isStatic: true
        }
        this.body = Bodies.fromVertices(this.x, this.y,[[
            {x:0,y:0},
            {x:0,y:0-15},
            {x:+50,y:-5},
            {x:+50,y:+5},
            {x:0,y:+15},
            {x:0,y:0}
        ]], options);
        Body.setCentre(this.body, {x:this.body.position.x-25,y:this.body.position.y});
        Body.scale(this.body,this.scaler,this.scaler, {x:this.body.position.x,y:this.body.position.y});
        Composite.add(world, this.body);
    }

    move(){
        this.isMoving = true;
    }

    update(p5: p5Type){
        if (this.isMoving==true){
            if (this.isMovingUp==false){
                this.orientation == "LEFT"? this.angle-= 10:this.angle+= 10;
                if (this.angle<-100 || this.angle>100){
                    this.isMovingUp=true;
                }
            }
            else{
                this.orientation == "LEFT"? this.angle+= 10:this.angle-= 10;
                if (this.angle>=25&&this.orientation=="LEFT"||
                this.angle<=25&&this.orientation=="RIGHT"
                ){
                    this.orientation == "LEFT"? this.angle=25:this.angle= -25;
                    this.isMoving = false;
                    this.isMovingUp= false;
                }
            }
        }
        Body.setAngle(this.body,p5.radians(this.angle));
        Body.setAngularVelocity(this.body,(this.angle/200));
    }

    show(p5: p5Type) {
        this.update(p5);
        let pos = this.body.position;
        p5.push();
        p5.translate(pos.x, pos.y);
        p5.noStroke();
        p5.fill(222,49,33);
        p5.ellipse(0,0,28);
        p5.rotate(p5.radians(this.angle));
        
        p5.beginShape();
        p5.curveVertex(0,0);
        p5.curveVertex(0,-15*this.scaler);
        p5.curveVertex(50*this.scaler,-5*this.scaler);
        p5.curveVertex(50*this.scaler,5*this.scaler);
        p5.curveVertex(0,15*this.scaler);
        p5.curveVertex(0,0);
        p5.endShape();
        
        p5.pop();
    }
}

export default Flipper;