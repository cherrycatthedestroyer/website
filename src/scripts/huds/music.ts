import p5Type from "p5";
import "p5/lib/addons/p5.sound";
import HUD from "./hud";
import PromptText from "../elements/promptText";
import SmallText from "../elements/smallText";

class Music extends HUD {
    track1: SmallText;
    track2: SmallText;
    track3: SmallText;
    track1Time: string;
    track2Time: string;
    track3Time: string;
    prompt1: PromptText;

    constructor(p5:p5Type,width:number,height:number) {
        super(p5,"MUSIC",width,height);
        this.track1Time = "02:49";
        this.track2Time = "01:55";
        this.track3Time = "03:52";
        this.track1= new SmallText("Disco In The Park          "+this.track1Time,15,width,height,"track1",p5);
        this.track2= new SmallText("LoLuV                      "+this.track2Time,15,width,height,"track2",p5);
        this.track3= new SmallText("Black Flume                "+this.track3Time,15,width,height,"track3",p5);
        this.prompt1= new PromptText("Press ENTER to play/pause",15,width,height,"enter",p5);
        this.buttonList = [this.track1,this.track2,this.track3,this.back];
        this.hudType="music";
        this.escPage="mediaSearch";
    }

    updateTimes(time:string){
        if (this.specialIndex===1){
            this.track1Time = time;
        }
        else if (this.specialIndex===2){
            this.track2Time = time;
        }
        else if (this.specialIndex===3){
            this.track3Time = time;
        }
    }

    rightClick(p5: p5Type){
        if (this.state=="on"){
            if (this.elementCount<3){
                this.elementCount++;
                if (this.elementCount==3){
                    this.arrowROff = true;
                }
                if (this.elementCount==2){
                    this.arrowLOff = false;
                }
            }
        }
    }

    leftClick(p5: p5Type){
        if (this.state=="on"){
            if (this.elementCount>1){
                this.elementCount--;
                if (this.elementCount==1){
                    this.arrowLOff = true;
                }
                if (this.elementCount==2||this.elementCount==1){
                    this.arrowROff = false;
                }
            }
        }
    }

    show(p5: p5Type,isMobile:boolean) {
        super.show(p5,isMobile);
        let offset;
        isMobile?p5.scale(1.5,1.5):p5.scale(0.9,0.9);
        isMobile?offset=120:offset=-50;
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-7,-220+offset,this.opacityCounter);
            //isMobile?p5.scale(1.5,1.5):p5.scale(1,1);
            this.elementCount==1? this.track1.select():this.track1.unselect();
            this.elementCount==2? this.track2.select():this.track2.unselect();
            this.elementCount==3? this.track3.select():this.track3.unselect();

            this.specialIndex==1? this.track1.activate():this.track1.dummy();
            this.specialIndex==2? this.track2.activate():this.track2.dummy();
            this.specialIndex==3? this.track3.activate():this.track3.dummy();

            this.track1.show(p5,-7,-150+offset,this.opacityCounter);
            this.track2.show(p5,-7,-110+offset,this.opacityCounter);
            this.track3.show(p5,-7,-70+offset,this.opacityCounter);

            isMobile?this.prompt1.inputText="TAP to play/pause":this.prompt1.inputText="press ENTER to play/pause";
            this.prompt1.show(p5,-7,-20+offset,this.opacityCounter);
        }
        p5.pop();
    }
}

export default Music;