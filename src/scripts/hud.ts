import p5Type from "p5";
import Element from "./element";

class HUD {
    logo: Element;
    arrowLeft: Element;
    arrowRight: Element;
    //arrowMessageLeft: Element;
    //arrowMessageRight: Element;
    back: Element;
    grain: Element;
    grain2: Element;
    elementCount: number;
    arrowROff: boolean;
    arrowLOff: boolean;
    opacityCounter: number;
    state:string;
    hudType:string;
    elementList: string[];
    idleCounter: number;
    escPage:string;
    specialIndex:number;
    ogWidth:number;
    ogHeight:number;
    xScale:number;
    yScale:number;


    constructor(p5:p5Type, path:string, width:number, height:number) {
        this.logo = new Element(path, path, p5, 0,width,height);
        this.arrowLeft = new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/lArrow_select.gif", p5, 0,width,height);
        this.arrowRight = new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/rArrow_select.gif", p5, 0,width,height);
        //this.arrowMessageLeft = new Element("assets/cleaned/placeholder.png",
        //"assets/cleaned/lArrow_message.gif", p5, 0);
        //this.arrowMessageRight = new Element("assets/cleaned/placeholder.png",
        //"assets/cleaned/rArrow_message.gif", p5, 0);
        this.back = new Element("assets/cleaned/back_message.gif",
        "assets/cleaned/back_message.gif", p5, 0,width,height);
        this.grain = new Element("assets/cleaned/grainDistort2.gif",
        "assets/cleaned/grainDistort.gif", p5, 0,width,height);
        this.grain2 = new Element("assets/cleaned/music_grain.gif","assets/cleaned/music_grain.gif",p5,0,width,height);
        //this.arrowMessageLeft.unselect();
        //this.arrowMessageRight.unselect();
        this.elementCount = 0;
        this.arrowROff = false;
        this.arrowLOff = true;
        this.opacityCounter=0;
        this.idleCounter=0;
        this.grain.select();
        this.state="off";
        this.hudType="generic";
        this.elementList=[];
        this.escPage = "home";
        this.specialIndex=-1;
        this.ogWidth=1368;
        this.ogHeight=755;
        this.xScale=width/this.ogWidth;
        this.yScale=height/this.ogHeight;
    }

    rightClick(p5: p5Type){
        if (this.state=="on"){
            if (this.elementCount<2){
                this.elementCount++;
            }
            if (this.elementCount==2){
                this.arrowROff = true;
            }
            if (this.elementCount==1){
                this.arrowLOff = false;
            }
        }
    }

    leftClick(p5: p5Type){
        if (this.state=="on"){
            if (this.elementCount>0){
                this.elementCount--;
            }
            if (this.elementCount==0){
                this.arrowLOff = true;
            }
            if (this.elementCount==1){
                this.arrowROff = false;
            }
        }
    }

    update(){
        if(this.state=="boot"){
            if(this.opacityCounter<1){
                this.arrowLOff=true;
                this.arrowROff=false;
            }
            this.opacityCounter+=5;
            if(this.opacityCounter>255){
                this.state="on";
                this.grain.unselect();
            }
        }
        else if (this.state=="on"){
            /*
            if (this.idleCounter<350){
                this.idleCounter++;
                if (this.idleCounter>250){
                    this.back.unselect();
                    if (!this.arrowLOff){
                        this.arrowLeft.unselect();
                        this.arrowMessageLeft.select();
                    }
                    if (!this.arrowROff){
                        this.arrowRight.unselect();
                        this.arrowMessageRight.select();
                    }
                }
            }
            else{
                this.idleCounter = 0;
                this.back.select();
                this.arrowMessageLeft.unselect();
                this.arrowMessageRight.unselect();
                if (!this.arrowLOff){
                    this.arrowLeft.select();
                }
                if (!this.arrowROff){
                    this.arrowRight.select();
                }
            }
            */
        }
        else if (this.state=="close"){
            this.grain.select();
            this.opacityCounter=0;
            this.elementCount=0;
            this.state = "off";
        }
    }

    setSpecialIndex(index:number){
        this.specialIndex=index;
    }

    boot(){
        this.state="boot";
    }

    close(){
        this.state="close";
    }

    show(p5: p5Type) {
        this.update();
        p5.push();
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.arrowLOff? this.arrowLeft.unselect():this.arrowLeft.select();
            this.arrowLeft.show(p5,-265,180);
            
            //this.arrowMessageLeft.show(p5,-290,240);
            this.arrowROff? this.arrowRight.unselect():this.arrowRight.select();
            this.arrowRight.show(p5,160,175);
            //this.arrowMessageRight.show(p5,180,240);
            if (this.hudType!=="home"){
                this.back.show(p5,-47,132);
            }
            p5.blendMode(p5.SCREEN);
            this.grain.show(p5,140,175);
            this.grain.show(p5,-270,175);
            p5.scale(1,1);
            this.grain2.show(p5,-45,40);
            p5.blendMode(p5.BLEND);
        }
    }
}
export default HUD;