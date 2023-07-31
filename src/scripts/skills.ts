import p5Type from "p5";
import Element from "./element";
import Project from "./project";

class Skills extends Project {

    constructor(p5:p5Type,width:number, height:number) {
        super(p5,"assets/cleaned/skills_logo.gif",width,height);
        this.info=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/skills_blurb.gif", p5, 0,width,height);
        this.stack=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/skills_stack.gif", p5, 0,width,height);
        this.link=new Element("assets/cleaned/placeholder.png",
        "assets/cleaned/skills_prompt.gif", p5, 0,width,height);
        this.hudType="skills";
        this.escPage="home";
    }

    show(p5: p5Type) {
        super.show(p5);
        if (this.state=="boot"||this.state=="on"||this.state=="close"){
            p5.tint(255,this.opacityCounter);
            this.logo.show(p5,-130,-300);
            this.elementCount==0? this.infoHeading.select():this.infoHeading.unselect() ;
            this.infoHeading.show(p5,-160,-190);
            this.elementCount==1? this.stackHeading.select():this.stackHeading.unselect() ;
            this.stackHeading.show(p5,-100,-190);
            this.elementCount==2? this.linkHeading.select():this.linkHeading.unselect() ;
            this.linkHeading.show(p5,-30,-190);
            p5.scale(0.8);
            if (this.elementCount==0){
                this.info.show(p5,-390,-240);
            }
            else if (this.elementCount==1){
                this.stack.show(p5,-340,-245);
            }
            else if (this.elementCount==2){
                this.link.show(p5,-100,-110);
            }
        }
        p5.pop();
    }
}

export default Skills;