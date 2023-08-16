import p5Type from "p5";
import Element from "../elements/element";
import PromptText from "../elements/promptText";
import HeadingText from "../elements/headingText";
import HoloText from "../elements/holoText";

class HUD {
    logo: HeadingText;
    arrowLeft: Element;
    arrowRight: Element;
    back: PromptText;
    grain: Element;
    grain2: Element;
    elementCount: number;
    arrowROff: boolean;
    arrowLOff: boolean;
    opacityCounter: number;
    state:string;
    hudType:string;
    elementList: string[];
    buttonList: HoloText[];
    idleCounter: number;
    escPage:string;
    specialIndex:number;
    ogWidth:number;
    ogHeight:number;
    xScale:number;
    yScale:number;

    constructor(p5:p5Type, path:string, width:number, height:number) {
        this.logo = new HeadingText(path,80,width,height,path,p5);
        this.arrowLeft = new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/lArrow_select.gif", p5, 0,width,height);
        this.arrowRight = new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/rArrow_select.gif", p5, 0,width,height);
        this.back = new PromptText("ESC",15,width,height,"back",p5);
        this.back.highlight();
        this.grain = new Element("assets/cleaned/grainDistort2.gif",
        "assets/cleaned/grainDistort.gif", p5, 0,width,height);
        this.grain2 = new Element("assets/cleaned/music_grain.gif","assets/cleaned/music_grain.gif",p5,0,width,height);
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
        this.logo.select();
        this.buttonList = [];
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

    handleClick(x: number, y: number,p5: p5Type, isMobile:boolean,width:number,height:number):string{
        let action = "";
        this.buttonList.forEach(e => {
            if (e.isClicked(x,y,p5,isMobile,width,height)){
                action=e.name;
                console.log(e.name);
            }
        })
        return action;
    }

    update(){
        if(this.state=="boot"){
            if(this.opacityCounter<1){
                this.arrowLOff=true;
                this.arrowROff=false;
            }
            this.opacityCounter+=5;
            if(this.opacityCounter>200){
                this.state="on";
                this.grain.unselect();
            }
        }
        else if (this.state=="close"){
            this.grain.select();
            this.opacityCounter=0;
            this.elementCount=0;
            this.state = "off";
        }
        if (this.state=="on"){
            if (this.elementCount==2){
                this.arrowROff = true;
            }
            if (this.elementCount==1){
                this.arrowLOff = false;
                this.arrowROff = false;
            }
            if (this.elementCount==0){
                this.arrowLOff = true;
            }
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

    show(p5: p5Type, isMobile:boolean) {
        this.update();
        p5.push();
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            if (isMobile===false){
                this.arrowLOff? this.arrowLeft.unselect():this.arrowLeft.select();
                this.arrowLeft.show(p5,-265,180);
                
                this.arrowROff? this.arrowRight.unselect():this.arrowRight.select();
                this.arrowRight.show(p5,160,175);
    
                if (this.hudType!=="home"){
                    this.back.inputText="ESC";
                    this.back.show(p5,-14,152,this.opacityCounter);
                }
                
                p5.blendMode(p5.SCREEN);
                this.grain.show(p5,140,175);
                this.grain.show(p5,-270,175);
                p5.scale(1,1);
                this.grain2.show(p5,-45,40);
                p5.blendMode(p5.BLEND);
            }
            else{
                if (this.hudType!=="home"){
                    this.back.inputText="Tap to Escape";
                    this.back.show(p5,-14,250,this.opacityCounter);
                }
            }
        }
    }
}

export default HUD;