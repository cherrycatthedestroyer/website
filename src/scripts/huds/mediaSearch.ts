import p5Type from "p5";
import HUD from "./hud";
import Element from "../elements/element";
import HeadingText from "../elements/headingText";
import PromptText from "../elements/promptText";

class MediaSearch extends HUD {
    element1: HeadingText;
    element2: HeadingText;
    element3: HeadingText;
    element4: HeadingText;
    element5: HeadingText;
    pageRight: PromptText;
    pageLeft: PromptText;
    enterElement: PromptText;
    tabber: Element;
    currentRow: number;

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"MEDIA",width,height);
        this.element1 = new HeadingText("Showreel",20,width,height,"vfx",p5);
        this.element2 = new HeadingText("Insupal",20,width,height,"insupal",p5);
        this.element3 = new HeadingText("Malaika",20,width,height,"malaika",p5);
        this.element4 = new HeadingText("Music",20,width,height,"music",p5);
        this.element5 = new HeadingText("CRISP",20,width,height,"crisp",p5);
        this.enterElement = new PromptText("Press ENTER to select",15,width,height,"enter",p5);
        this.pageRight = new PromptText("tap for PAGE 2",15,width,height,"page2",p5);
        this.pageLeft = new PromptText("tap for PAGE 1",15,width,height,"page1",p5);
        this.tabber = new Element("assets/cleaned/tracker_2.gif",
        "assets/cleaned/tracker_1.gif", p5, 0.02,width,height);
        this.element2.select();
        this.currentRow = 0;
        this.hudType="mediaSearch";
        this.elementList = ["vfx","insupal","malaika","music","crisp"];
        this.buttonList = [this.element1,this.element2,this.element3,this.element4,this.element5,this.back];
    }

    rightClick(p5: p5Type){
        if (this.state=="on"){
            if (this.elementCount<4){
                this.elementCount++;
                if (this.elementCount==4){
                    this.arrowROff = true;
                }
                if (this.elementCount==1){
                    this.arrowLOff = false;
                }
            }
        }
    }

    leftClick(p5: p5Type){
        if (this.state=="on"){
            if (this.elementCount>0){
                this.elementCount--;
                if (this.elementCount==0){
                    this.arrowLOff = true;
                }
                if (this.elementCount==3||this.elementCount==1){
                    this.arrowROff = false;
                }
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
            if (this.elementCount>0){
                if (this.elementCount==0){
                    this.arrowLOff = true;
                }
                if (this.elementCount==3||this.elementCount==1){
                    this.arrowROff = false;
                }
            }
            else if (this.elementCount<4){
                if (this.elementCount==4){
                    this.arrowROff = true;
                }
                if (this.elementCount==1){
                    this.arrowLOff = false;
                }
            }
        }
    }

    show(p5: p5Type,isMobile:boolean) {
        super.show(p5,isMobile);
        let offset;
        isMobile?p5.scale(1.5,1.5):p5.scale(0.9,0.9);
        isMobile?offset=120:offset=0;
        isMobile?this.enterElement.inputText="TAP to select":this.enterElement.inputText="press ENTER to select";
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-7,-220+offset,this.opacityCounter);
            if (this.elementCount>=0 && this.elementCount<3){
                this.elementCount==0? this.element1.select():this.element1.unselect() ;
                this.element1.show(p5,-140,-160+offset,this.opacityCounter);
                this.elementCount==1? this.element2.select():this.element2.unselect() ;
                this.element2.show(p5,-10,-160+offset,this.opacityCounter);
                this.elementCount==2? this.element3.select():this.element3.unselect() ;
                this.element3.show(p5,120,-160+offset,this.opacityCounter);
                this.tabber.select();
                this.element1.isVisible = true;
                this.element2.isVisible = true;
                this.element3.isVisible = true;
                this.element4.isVisible = false;
                this.element5.isVisible = false;
                p5.push();
                p5.angleMode(p5.DEGREES);
                p5.rotate(90);
                this.pageRight.select();
                isMobile?this.pageRight.show(p5,0,-this.ogWidth*0.5/2,this.opacityCounter):this.pageRight.dummy();
                p5.pop();
            }
            else{
                this.elementCount==3? this.element4.select():this.element4.unselect() ;
                this.element4.show(p5,-140,-160+offset,this.opacityCounter);
                this.elementCount==4? this.element5.select():this.element5.unselect() ;
                this.element5.show(p5,0,-160+offset,this.opacityCounter);
                this.tabber.unselect();
                this.element1.isVisible = false;
                this.element2.isVisible = false;
                this.element3.isVisible = false;
                this.element4.isVisible = true;
                this.element5.isVisible = true;
                p5.push();
                p5.angleMode(p5.DEGREES);
                p5.rotate(90);
                this.pageLeft.select();
                isMobile?this.pageLeft.show(p5,0,this.ogWidth*0.5/2,this.opacityCounter):this.pageLeft.dummy();
                p5.pop();
            }
            p5.angleMode(p5.RADIANS);
            this.tabber.show(p5, -20,-30+offset);
            this.enterElement.show(p5,-7,-70+offset,this.opacityCounter);
        }
        p5.pop();
    }
}

export default MediaSearch;