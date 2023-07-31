import p5Type from "p5";
import Element from "./element";
import Project from "./project";

class Faceflute extends Project {

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"assets/cleaned/faceflute_logo.gif",width,height);
        this.info=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/faceflute_info.gif", p5, 0,width,height);
        this.stack=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/faceflute_stack.gif", p5, 0,width,height);
        this.link=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/faceflute_prompt.gif", p5, 0,width,height);
        this.hudType="faceflute";
        this.escPage="projectSearch";
    }

    show(p5: p5Type) {
        super.show(p5);
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-250,-300);
            this.elementCount==0? this.infoHeading.select():this.infoHeading.unselect() ;
            this.infoHeading.show(p5,-180,-190);
            this.elementCount==1? this.stackHeading.select():this.stackHeading.unselect() ;
            this.stackHeading.show(p5,-120,-190);
            this.elementCount==2? this.linkHeading.select():this.linkHeading.unselect() ;
            this.linkHeading.show(p5,-50,-190);
            if (this.elementCount==0){
                this.info.show(p5,-215,-195);
            }
            else if (this.elementCount==1){
                this.stack.show(p5,-215,-190);
            }
            else if (this.elementCount==2){
                this.link.show(p5,-80,-110);
            }
        }
        p5.pop();
    }
}

export default Faceflute;