import p5Type from "p5";
import HUD from "./hud";
import Element from "./element";

class ProjectSearch extends HUD {
    element1: Element;
    element2: Element;
    element3: Element;
    element4: Element;
    element5: Element;
    enterElement: Element;
    tabber: Element;
    currentRow: number;

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"assets/cleaned/projectSearch_logo.gif",width,height);
        this.element1 = new Element("assets/cleaned/projectSearch_SpacePong_unselected.gif",
        "assets/cleaned/projectSearch_SpacePong_selected.gif", p5, 0,width,height);
        this.element2 = new Element("assets/cleaned/projectSearch_TaskPad_unselected.gif",
        "assets/cleaned/projectSearch_TaskPad_selected.gif", p5, 0,width,height);
        this.element3 = new Element("assets/cleaned/projectSearch_FaceFlute_unselected.gif",
        "assets/cleaned/projectSearch_FaceFlute_selected.gif", p5, 0,width,height);
        this.element4 = new Element("assets/cleaned/projectSearch_Vibecheck_unselected.gif",
        "assets/cleaned/projectSearch_Vibecheck_selected.gif", p5, 0,width,height);
        this.element5 = new Element("assets/cleaned/projectSearch_FishingSim_unselected.gif",
        "assets/cleaned/projectSearch_FishingSim_selected.gif", p5, 0,width,height);
        this.enterElement = new Element("assets/cleaned/selecter_prompt.gif",
        "assets/cleaned/selecter_prompt.gif", p5, 0.02,width,height);
        this.tabber = new Element("assets/cleaned/tracker_2.gif",
        "assets/cleaned/tracker_1.gif", p5, 0.02,width,height);
        this.element2.unselect();
        this.element3.unselect();
        this.element4.unselect();
        this.element5.unselect();
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
            this.logo.show(p5,-195,-300);
            if (this.elementCount>=0 && this.elementCount<3){
                this.elementCount==0? this.element1.select():this.element1.unselect() ;
                this.element1.show(p5,-180,-160);
                this.elementCount==1? this.element2.select():this.element2.unselect() ;
                this.element2.show(p5,-50,-160);
                this.elementCount==2? this.element3.select():this.element3.unselect() ;
                this.element3.show(p5,60,-160);
                this.tabber.select();
                
            }
            else{
                this.elementCount==3? this.element4.select():this.element4.unselect() ;
                this.element4.show(p5,-180,-160);
                this.elementCount==4? this.element5.select():this.element5.unselect() ;
                this.element5.show(p5,-60,-160);
                this.tabber.unselect();
            }
            this.tabber.show(p5, -20,-30);
            this.enterElement.show(p5,-80,-70);
        }
        p5.pop();
    }
}

export default ProjectSearch;