import p5Type from "p5";
import HUD from "./hud";
import Element from "./element";
import HeadingText from "./headingText";
import PromptText from "./promptText";

class ProjectSearch extends HUD {
    element1: HeadingText;
    element2: HeadingText;
    element3: HeadingText;
    element4: HeadingText;
    element5: HeadingText;
    enterElement: PromptText;
    tabber: Element;
    currentRow: number;

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"PROJECTS",width,height);
        this.element1 = new HeadingText("SpaceBall",20,width,height,p5);
        this.element2 = new HeadingText("TaskPad",20,width,height,p5);
        this.element3 = new HeadingText("Faceflute",20,width,height,p5);
        this.element4 = new HeadingText("Vibecheck",20,width,height,p5);
        this.element5 = new HeadingText("FishingSim",20,width,height,p5);
        this.enterElement = new PromptText("Press ENTER to select",15,width,height,p5);
        this.tabber = new Element("assets/cleaned/tracker_2.gif",
        "assets/cleaned/tracker_1.gif", p5, 0.02,width,height);
        this.element2.select();
        this.currentRow = 0;
        this.hudType="projectSearch";
        this.elementList = ["spaceball","taskpad","faceflute","vibecheck","fishingsim"];
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

    show(p5: p5Type) {
        super.show(p5);
        p5.scale(0.9,0.9);
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-7,-220,this.opacityCounter);
            if (this.elementCount>=0 && this.elementCount<3){
                this.elementCount==0? this.element1.select():this.element1.unselect() ;
                this.element1.show(p5,-140,-160,this.opacityCounter);
                this.elementCount==1? this.element2.select():this.element2.unselect() ;
                this.element2.show(p5,-10,-160,this.opacityCounter);
                this.elementCount==2? this.element3.select():this.element3.unselect() ;
                this.element3.show(p5,120,-160,this.opacityCounter);
                this.tabber.select();
                
            }
            else{
                this.elementCount==3? this.element4.select():this.element4.unselect() ;
                this.element4.show(p5,-140,-160,this.opacityCounter);
                this.elementCount==4? this.element5.select():this.element5.unselect() ;
                this.element5.show(p5,0,-160,this.opacityCounter);
                this.tabber.unselect();
            }
            this.tabber.show(p5, -20,-30);
            this.enterElement.show(p5,-7,-70,this.opacityCounter);
        }
        p5.pop();
    }
}

export default ProjectSearch;