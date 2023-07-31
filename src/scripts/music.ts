import p5Type from "p5";
import "p5/lib/addons/p5.sound";
import HUD from "./hud";
import Element from "./element";

class Music extends HUD {
    track1: Element;
    track2: Element;
    track3: Element;
    track1_active: Element;
    track2_active: Element;
    track3_active: Element;
    prompt1: Element;

    constructor(p5:p5Type,width:number,height:number) {
        super(p5,"assets/cleaned/music_logo.gif",width,height);
        this.track1=new Element("assets/cleaned/music_track1_unselected.gif",
        "assets/cleaned/music_track1_selected.gif", p5, 0,width,height);
        this.track2=new Element("assets/cleaned/music_track2_unselected.gif",
        "assets/cleaned/music_track2_selected.gif", p5, 0,width,height);
        this.track3=new Element("assets/cleaned/music_track3_unselected.gif",
        "assets/cleaned/music_track3_selected.gif", p5, 0,width,height);
        this.track1_active=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/music_track1_active.gif", p5, 0,width,height);
        this.track2_active=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/music_track2_active.gif", p5, 0,width,height);
        this.track3_active=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/music_track3_active.gif", p5, 0,width,height);
        this.prompt1=new Element("assets/cleaned/music_prompt2.gif",
        "assets/cleaned/music_prompt2.gif", p5, 0,width,height);
        
        this.hudType="music";
        this.escPage="home";
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

    show(p5: p5Type) {
        super.show(p5);
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-110,-300);
            this.elementCount==1? this.track1.select():this.track1.unselect();
            this.elementCount==2? this.track2.select():this.track2.unselect();
            this.elementCount==3? this.track3.select():this.track3.unselect();

            this.specialIndex==1? this.track1_active.show(p5,-200,-180):this.track1.show(p5,-200,-180);
            this.specialIndex==2? this.track2_active.show(p5,-200,-140):this.track2.show(p5,-200,-140);
            this.specialIndex==3? this.track3_active.show(p5,-200,-100):this.track3.show(p5,-200,-100);

            this.prompt1.show(p5,-70,-50);
        }
        p5.pop();
    }
}

export default Music;