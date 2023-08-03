import p5Type from "p5";
import Matter from "matter-js";
import Ball from "./ball"
import Flipper from "./flipper"
import PinballFrame from "./pinballFrame";
import HeadingText from "../elements/headingText";

let Engine = Matter.Engine, Runner = Matter.Runner;

class Pinball {
  width: number;
  height: number;
  y: number;
  cockpitAngle: number;
  score:number;
  tries:number;

  engine: Matter.Engine;
  pinballFrame: PinballFrame;
  flipperL: Flipper;
  flipperR: Flipper;
  ball: Ball;

  font: p5Type.Font;
  lArrow: HeadingText;
  rArrow: HeadingText;

  constructor(width:number, height: number, p5:p5Type) {
    this.width = width;
    this.height = height;
    this.cockpitAngle = 0;
    this.y = -800;
    
    this.engine = Engine.create();
    this.engine.gravity.y = 0.6;
    this.pinballFrame = new PinballFrame(this.engine.world);
    this.flipperL = new Flipper(1, "LEFT",this.engine.world);
    this.flipperR = new Flipper(1, "RIGHT",this.engine.world);
    this.ball = new Ball(0,0,5,this.engine.world);

    this.lArrow = new HeadingText("Left Arrow",15,width,height,p5);
    this.rArrow = new HeadingText("Right Arrow",15,width,height,p5);
    this.lArrow.select();
    this.rArrow.select();

    this.score = 0;
    this.tries = 0;

    this.font = p5.loadFont("assets/SceletAF.otf");

    let runner = Runner.create();
    Runner.run(runner, this.engine);
  }

  pinball(action: string){
    if(action == "lFlip"){
        this.flipperL.move();
    }
    if(action == "rFlip"){
      this.flipperR.move();
    }
    if(action == "move"){
      this.ball.drop();
    }
  }

  update(){
    this.score=this.pinballFrame.score;
    this.tries=this.ball.tries;
  }

  show(p5: p5Type, y:number,isMobile:boolean) {
    this.update();
    p5.push();
    p5.translate(0,-20);
    p5.fill(245,212,125,200);
    p5.textFont(this.font, 10);
    p5.text("score: "+ this.score,-140,-220);
    p5.textAlign(p5.RIGHT);
    p5.text("tries: "+this.tries,140,-220);
    p5.fill(222,49,33);
    p5.textAlign(p5.CENTER);
    isMobile?p5.text("Tap here to exit",0,240):p5.text("ESC to exit",0,240);
    p5.textFont(this.font, 10);
    p5.textAlign(p5.CENTER);
    p5.textSize(14);
    if (this.ball.state==="IDLE"){
      isMobile?p5.text("Tap here to start",0,-218):p5.text("SPACE to start",0,-218);
    }
    else{
      isMobile?p5.text("Tap L/R to flip",0,-218):p5.text("ARROW KEYS to flip",0,-218);
    }
    isMobile?this.lArrow.inputText="Tap Left":this.lArrow.inputText="Left Arrow";
    isMobile?this.rArrow.inputText="Tap Right":this.rArrow.inputText="Right Arrow";
    this.lArrow.show(p5,-200,0,250);
    this.rArrow.show(p5,200,0,250);
    this.pinballFrame.show(p5,this.ball);
    this.flipperL.show(p5);
    this.flipperR.show(p5);
    this.ball.show(p5);
    p5.pop();
  }
}

export default Pinball;