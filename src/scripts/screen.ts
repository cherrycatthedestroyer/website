import p5Type from "p5";
import Pinball from "./pinball";
import Element from "./element";


class Screen {

    width: number;
    height: number;
    y: number;
    cockpitAngle: number;
    panelImg: Element;
    screenBtmImg: Element;
    grainImg: Element;
    screenImg: Element;
    screenDustImg: Element;
    screenFrameImg: Element;
    pinball: Pinball;
    state: string;

    counter:number;

    constructor(width:number, height: number, p5:p5Type) {
        this.width = width;
        this.height = height;
        this.cockpitAngle = 0;
        this.y= -800;
        this.panelImg = new Element("assets/background.png","assets/background.png",p5,0,width,height);
        this.screenBtmImg = new Element("assets/frame0.png","assets/frame0.png",p5,0,width,height);
        this.grainImg = new Element("assets/grain.gif","assets/grain.gif",p5,0,width,height);
        this.screenImg = new Element("assets/frame1.png","assets/frame1.png",p5,0,width,height);
        this.screenDustImg = new Element("assets/frame2.png","assets/frame2.png",p5,0,width,height);
        this.screenFrameImg = new Element("assets/frame3.png","assets/frame3.png",p5,0,width,height);
        this.pinball = new Pinball(width,height,p5);

        this.counter=0;
        this.state="off";
    }

    update(p5: p5Type){
        if (this.state=="on"){
            if (this.y<0){
                this.y+=10;
            }
        }
        else if (this.state=="closing"){
            if (this.y>-800){
                this.y-=10;
            }
            else{
                this.state="off";
                this.y=-800;
            }
        }
    }

    pinballEvent(action: string){
        if(action == "lFlip"){
            this.pinball.flipperL.move();
          }
        if(action == "rFlip"){
            this.pinball.flipperR.move();
        }
        if(action == "move"){
            this.pinball.ball.drop();
        }
        if (action== "ENTER"){
            this.state="on";
        }
        if (action== "ESC"){
            this.state="closing";
            this.pinball.ball.tries=0;
            this.pinball.pinballFrame.score=0;
        }
    }

    show(p5: p5Type) {
        p5.push();
        p5.translate(0, this.y);
        this.update(p5);
        p5.push();
        p5.scale(0.7,0.7);
        this.panelImg.show(p5,-500,-510);
        p5.scale(0.9,1.15);
        this.screenBtmImg.show(p5,-440, -360);
        p5.pop();
        this.pinball.show(p5,this.y);
        p5.push();
        p5.blendMode(p5.SCREEN);
        p5.push();
        p5.scale(1,1.4);
        this.grainImg.show(p5, -275, -210);
        p5.pop();
        p5.scale(0.69,0.89);
        p5.blendMode(p5.MULTIPLY);
        this.screenImg.show(p5,-445, -340);
        p5.blendMode(p5.SCREEN);
        this.screenDustImg.show(p5,-445, -350);
        p5.blendMode(p5.BLEND);
        this.screenFrameImg.show(p5,-445, -350);
        p5.pop();
        p5.pop();
    }
}

export default Screen;